using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public AdminController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
            
        }
       [Authorize(Policy="RequiredAdminRole")]
        [HttpGet("userWithRoles")]
         public async Task<IActionResult> GetUserWithRoles()
        {
            var userList = await _context.Users
                .OrderBy(x => x.UserName)
                .Select(user => new {
                    Id = user.Id,
                    UserName = user.UserName,
                    Roles = (from userRole in user.UserRoles
                    join role in _context.Roles
                    on userRole.RoleId
                    equals role.Id
                    select role.Name).ToList()
                }).ToListAsync();
            return Ok(userList);
        }
        
        [Authorize(Policy="RequiredAdminRole")]
        [HttpPost("editRole/{userName}")]

        public async Task<IActionResult> EditRole(string userName, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(userName);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleName;

            selectedRoles = selectedRoles ?? new string[]{};

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if(!result.Succeeded)
                return BadRequest("Failed to add to roles");
            
            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if(!result.Succeeded)
               return BadRequest("Failed to remove roles");
            
            return Ok(await _userManager.GetRolesAsync(user));

        }

        [Authorize(Policy="ModeratePhotoRole")]
        [HttpGet("photosForModeration")]
         public  IActionResult GetPhotosForModeration()
        {
            return Ok("Admin or moderator can access this");
        }
    }
}