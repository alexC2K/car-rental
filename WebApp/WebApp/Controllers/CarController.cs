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
    public class CarController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public CarController(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _env = environment;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT CarID, CarName, CarKM, CarYear, CarImage, CarRented from dbo.Car";

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

        [Route("GetCarOwner/{id}")]
        [HttpGet("{id}")]
        public JsonResult GetCarOwner(int id)
        {
            string query = @"SELECT OwnerName FROM dbo.Owner WHERE CarOwnedID = "+ id + @"";

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
        public JsonResult Post(Car dep)
        {
            string query = @"INSERT INTO dbo.Car (CarName, CarKM, CarYear, CarImage, CarRented) VALUES 
                            (
                                '" + dep.CarName + @"',
                                '" + dep.CarKM + @"',
                                '" + dep.CarYear + @"',
                                '" + dep.CarImage + @"',
                                '" + dep.CarRented + @"'
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

        [Route("UpdateRentStatus")]
        [HttpPut]
        public JsonResult UpdateRentStatus(Car dep)
        {
            string query = @"UPDATE dbo.Car SET 
                            CarRented = '0'
                            WHERE CarID = " + dep.CarID + @"";

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

        [HttpPut]
        public JsonResult Put(Car dep)
        {
            string query = @"UPDATE dbo.Car SET 
                            CarName = '" + dep.CarName + @"',
                            CarKM = " + dep.CarKM + @",
                            CarYear = " + dep.CarYear + @",
                            CarImage = '" + dep.CarImage + @"',
                            CarRented = '" + dep.CarRented + @"'
                            WHERE CarID = " + dep.CarID + @"";

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
            string query = @"DELETE FROM dbo.Car
                            WHERE CarID = " + id + @"";

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

        [Route("SaveCarFile")]
        [HttpPost]
        public JsonResult SaveCarFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedfile = httpRequest.Files[0];

                string filename = postedfile.FileName;
                var physicalpath = _env.ContentRootPath + "/CarPhotos/" + filename;

                using (var stream = new FileStream(physicalpath, FileMode.Create))
                {
                    postedfile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("default.jpg");
            }
        }
    }
}
