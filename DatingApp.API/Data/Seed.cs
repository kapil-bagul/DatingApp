using System.Collections.Generic;
using System.Linq;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager )
        {
            if(!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                // create new roles
                 var roles = new List<Role>
                 {
                     new Role{ Name="Member" },
                     new Role{ Name="Admin" },
                     new Role{ Name="Moderator" },
                     new Role{ Name="VIP" }
                 };

                 foreach( var role in roles)
                 {
                     roleManager.CreateAsync(role).Wait();
                 }
                foreach(var user in users)
                {
                    //byte[] passwordHash, passwordSalt;
                    //CreatePasswordHash("password", out passwordHash,out passwordSalt);
                    //user.PasswordHash = passwordHash;
                    //user.PasswordSalt = passwordSalt;
                    //user.UserName = user.UserName.ToLower();
                    //context.Users.Add(user);


                    //changes after IdentityManagement implementation
                    userManager.CreateAsync(user,"password").Wait();
                    userManager.AddToRoleAsync(user, "Member");

                }

                var adminUser = new User
                {
                    UserName = "Admin"
                };

                var result = userManager.CreateAsync(adminUser,"password").Result;
                
                if(result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
                }

               


            }
                
                

        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}