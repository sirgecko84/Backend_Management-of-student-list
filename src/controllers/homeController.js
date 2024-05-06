const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService');

const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('home.ejs', { listUsers: results })
}
const getABC = (req, res) => {
    res.send('check check abc')
}
const getHoikhanhit = (req, res) => {
    //res.send('<h1> check abc </h1>')
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    console.log(">>> req.body ", req.body)
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.mycity;

    console.log(">>> email=", email, 'name =', name, 'city =', city)

    //let { email, name, city } = req.body

    let [results, fields] = await connection.query(
        `INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`, [email, name, city]
    );

    console.log(">>> check results: ", results)

    res.send(' Created user succeed!')
    // connection.query(
    //   'select * from Users u',
    //  function (err, results, fields) {
    //     console.log(">>>results= ", results); // kết quả trả về
    //   console.log(">>> fields= ", fields); // thông tin bổ sung(tên các cột, kiểu dữ liệu, ...)
    // }

    //const [results, fields] = await connection.querry('select * from Users u');


}

const postUpdateUser = async (req, res) => {
    console.log(">>> req.body ", req.body)
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.mycity;
    let userId = req.body.userId;

    //console.log(">>> email=", email, 'name =', name, 'city =', city, 'userId: ', userId)

    //let { email, name, city } = req.body

    await updateUserById(email, city, name, userId);

    // console.log(">>> check results: ", results)

    // res.send(' Updated user succeed!')
    res.redirect('/');
    // connection.query(
    //   'select * from Users u',
    //  function (err, results, fields) {
    //     console.log(">>>results= ", results); // kết quả trả về
    //   console.log(">>> fields= ", fields); // thông tin bổ sung(tên các cột, kiểu dữ liệu, ...)
    // }

    //const [results, fields] = await connection.querry('select * from Users u');


}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {
    const userID = req.params.id;

    let user = await getUserById(userID);


    res.render('edit.ejs', { userEdit: user }); // x <-y
}

const postDeleteUser = async (req, res) => {
    const userID = req.params.id;

    let user = await getUserById(userID);
    res.render('delete.ejs', { userEdit: user })
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId;
    await deleteUserById(id)
    res.redirect('/')
}
module.exports = {
    getHomepage, getABC, getHoikhanhit,
    postCreateUser, getCreatePage, getUpdatePage,
    postUpdateUser, postDeleteUser, postHandleRemoveUser
}