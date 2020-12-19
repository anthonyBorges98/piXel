var db = require('../conf/database');
const PostModel = {};

PostModel.create = (title,description,photopath, thumbnail, fk_userid) =>{
    let baseSQL =
        "INSERT INTO posts (title,description,photopath,thumbnail,created,fk_userid)" +
        "VALUE (?,?,?,?,now(),?);";
    return db
        .execute(baseSQL, [title, description, photopath, thumbnail, fk_userid,])
    .then(([results,fields]) => {
        return Promise.resolve(results && results.affectedRows);
    })
        .catch((err) => Promise.reject(err));
};

PostModel.search = (searchTerm) =>{
    let baseSQL = "SELECT id, title,description,thumbnail,concat_ws(' ',title,description) AS " +
        "haystack / FROM posts / HAVING haystack like ?;";
    let sqlReadySearchTerm = "%" + searchTerm + "%";
    return db.execute(baseSQL, [sqlReadySearchTerm])
        .then(([results,fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject((err)));
}

PostModel.getNRecentPosts = (numberOfPost) => {
    let baseSQL = 'SELECT id,title,description,thumbnail,created FROM posts ORDER BY created DESC LIMIT 8';
    return db.execute(baseSQL,[])
        .then(([results,fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
};

module.exports = PostModel;