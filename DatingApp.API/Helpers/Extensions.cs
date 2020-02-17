using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationErrors( this HttpResponse  response, string message){
            response.Headers.Add("Application-Error" , message);
            response.Headers.Add("Access-Control-Expose-Header", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*"); 
        }

        public static int CalculateAge( this DateTime theDateOfBirth)
        {
                var age = DateTime.Today.Year - theDateOfBirth.Year;
                if(theDateOfBirth.AddYears(age)> DateTime.Today )
                    age--;
                
                return age;
        }
    }
}