using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using WebApp.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public OwnerController(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _env = environment;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT OwnerID, OwnerName, OwnerPhotoName, OwnerPhoneNumber, Car, DateJoined, CarOwnedID from dbo.Owner";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("OwnerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Owner emp)
        {
            string query = @"INSERT INTO dbo.Owner (OwnerName, OwnerPhotoName, Car, DateJoined, OwnerPhoneNumber, CarOwnedID) VALUES 
                            (
                                '" + emp.OwnerName + @"',
                                '" + emp.OwnerPhotoName + @"',
                                '" + emp.Car + @"',
                                '" + emp.DateJoined + @"',
                                '" + emp.OwnerPhoneNumber + @"',
                                '" + emp.CarOwnedID + @"'
                            )";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("OwnerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added succesfully.");
        }

        [HttpPut]
        public JsonResult Put(Owner emp)
        {
            string query = @"UPDATE dbo.Owner SET 
                            OwnerName = '" + emp.OwnerName + @"',
                            OwnerPhotoName = '" + emp.OwnerPhotoName + @"',
                            Car = '" + emp.Car + @"',
                            DateJoined = '" + emp.DateJoined + @"',
                            OwnerPhoneNumber = '" + emp.OwnerPhoneNumber + @"',
                            CarOwnedID = '" + emp.CarOwnedID + @"'
                            WHERE OwnerID = " + emp.OwnerID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("OwnerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated succesfully.");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM dbo.Owner
                            WHERE OwnerID = " + id + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("OwnerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted succesfully.");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedfile = httpRequest.Files[0];

                string filename = postedfile.FileName;
                var physicalpath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalpath, FileMode.Create))
                {
                    postedfile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch(Exception)
            {
                return new JsonResult("default.jpg");
            }
        }

        [Route("GetRentedCars")]
        public JsonResult GetRentedCars()
        {
            string query = @"SELECT CarID, CarName from dbo.Car WHERE CarRented = 1";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("OwnerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("GetAllCarNames")]
        public JsonResult GetAllCarNames()
        {
            string query = @"SELECT CarName, CarYear FROM dbo.Car";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("OwnerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
    }
}
