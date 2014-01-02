object Global extends GlobalSettings {
  override def onHandlerNotFound(request: RequestHeader): Result = {
    NotFound(views.html.notFound())
  }
}