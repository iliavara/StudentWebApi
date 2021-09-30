using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsWebAPI.Models;

namespace StudentsWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentModelController : ControllerBase
    {
        private readonly StudentDetailContext _context;

        public StudentModelController(StudentDetailContext context)
        {
            _context = context;
        }

        // GET: api/StudentModel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentModel>>> GetStudentDetail()
        {
            return await _context.StudentDetail.ToListAsync();
        }

        // GET: api/StudentModel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentModel>> GetStudentModel(int id)
        {
            var studentModel = await _context.StudentDetail.FindAsync(id);

            if (studentModel == null)
            {
                return NotFound();
            }

            return studentModel;
        }

        // PUT: api/StudentModel/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentModel(int id, StudentModel studentModel)
        {
            if (id != studentModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(studentModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StudentModel
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentModel>> PostStudentModel(StudentModel studentModel)
        {
            _context.StudentDetail.Add(studentModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentModel", new { id = studentModel.Id }, studentModel);
        }

        // DELETE: api/StudentModel/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentModel(int id)
        {
            var studentModel = await _context.StudentDetail.FindAsync(id);
            if (studentModel == null)
            {
                return NotFound();
            }

            _context.StudentDetail.Remove(studentModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentModelExists(int id)
        {
            return _context.StudentDetail.Any(e => e.Id == id);
        }
    }
}
