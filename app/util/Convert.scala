package util


object Convert {
    
    val pegdown = new org.pegdown.PegDownProcessor()
    
    def markdownToHtml(rawMd: String) = play.api.templates.Html(pegdown.markdownToHtml(rawMd))

}