using Microsoft.AspNetCore.Mvc;
using TextilTech.Models;

namespace TextilTech.Controllers {
  [Route("api/[Controller]")]
  [ApiController]
  public class UserController: ControllerBase {
    [HttpGet]
    public ActionResult<UserModel> GetSingleUser(string id) {
      return Ok(id);
    }
  }
}
