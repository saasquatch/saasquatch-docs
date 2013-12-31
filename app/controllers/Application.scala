package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {
    
  val slugMap = HashMap(
        "testing-best-practices" -> views.html.index.testing-best-practices,
        "page-speed-best-practices" ->  views.html.index.page-speed-best-practices
      )

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }
  
  def page(slug){
    Ok(slugMap.get(slug))
  }

}