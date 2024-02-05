
function seSwagger(body: any): any {

    if(typeof body.tags == 'string'){
       const tagsArray = body.tags.split(',')

        return {
            titulo: body.titulo,
            tags: tagsArray,
            link: body.link,
            descricao: body.descricao,
            usuario_id: body.usuario_id,
            autor: body.autor
        }
    }

    return body
}
export default seSwagger
