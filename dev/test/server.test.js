import chai from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'
import server from '../src/server'
import { dbPath } from '../src/config'
import Item from '../src/models/item'
import TempAccount from '../src/models/temp_account'
import Account from '../src/models/account'
import fs from 'fs'
import { imageDir } from '../src/config/pathConfig'
const { expect, should } = chai
import bcrypt from 'bcrypt'

chai.use(chaiHttp);

before((done) => { //Before each test we empty the database
    TempAccount.remove({}, (err) => {
        Item.remove({}, (err) => {
            Account.remove({}, (err) => {
                //create test password
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync("12345678a", salt);
                //save test account
                var ekkasitAccount = new Account({ "name": "ek", "email": "epinyoan@stevens.edu", "password": hash, "status": "active" });
                ekkasitAccount.save(function (err) {
                    // console.log(err)
                    done()
                    // saved!
                })

            })

        })
    })

})

describe('---- Account Testing -------', () => {
    /*
    * Test Server Entrance
    */
    it('should work', function () {
        expect(true).to.be.true
    })

    /*
    * Test the /POST Signup
    */
    //first register
    it('it should POST signup in the first time', (done) => {
        signupTestFunction(server).end((err, res) => {
            expect(res.body.msg).to.be.eql('An email has been sent to you. Please check it to verify your account.')
            done()
            //second register
            describe('---- Signup Twice -------', () => {
                it('it should POST signup in the second time', (done) => {
                    signupTestFunction(server).end((err, res) => {
                        expect(res.body.msg).to.be.eql('You have already signed up. Please check your email to verify your account.')
                        done()
                    })
                })
            })
        })
    })
    function signupTestFunction(server) {
        return chai.request(server)
            //post json
            .post('/services/signup')
            .set('X-API-Key', 'foobar')
            .send({ name: 'aaa', password: '123', email: 'exitudio@exit.com', type: 'register' })
    }
})

describe('---- Login test -------', () => {
    it('it should log in success fully.', (done) => {
        chai.request(server)
            .post('/services/login')
            .set('content-type', 'application/json')
            .send({ "email": "epinyoan@stevens.edu", "password": "12345678a" })
            .end((err, res) => {
                // console.dir(res.body)
                expect(!!res.body.token).to.be.true
                done()

                //testPostDataAfterLogin
                testPostData(res.body.token)
                testPostDataNotLogin()
                testPostDataNoImage(res.body.token)
                testPostDataPriceLessThan0(res.body.token)
            })
    })
})
describe('---- Login test Wrong email -------', () => {
    it('it should log in success fully.', (done) => {
        chai.request(server)
            .post('/services/login')
            .set('content-type', 'application/json')
            .send({ "email": "epinyoan@stevens1.edu", "password": "12345678a" })
            .end((err, res) => {
                // console.dir(res.body)
                expect(res.body.errors.form).to.be.eql('Cannot find user.')
                done()
            })
    })
})
describe('---- Login test Wrong Password -------', () => {
    it('it should log in success fully.', (done) => {
        chai.request(server)
            .post('/services/login')
            .set('content-type', 'application/json')
            .send({ "email": "epinyoan@stevens1.edu", "password": "12345678a" })
            .end((err, res) => {
                // console.dir(res.body)
                expect(res.body.errors.form).to.be.eql('Cannot find user.')
                done()
            })
    })
})

/*
* Test the /GET products
*/
describe('/GET product', () => {
    it('it should GET all the products', (done) => {
        chai.request(server)
            .get('/services/getproducts')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json

                res.body.products.forEach(product => {
                    product.medias.forEach(media => {
                        fs.unlink(imageDir + media.imageName, () => { })
                        fs.unlink(imageDir + media.thumbnailName, () => { })
                    })
                })
                // expect(res.body).to.be.a('array')
                // expect(res.body.length).to.be.eql(0)
                done()
            })
    })
})

function testPostData(token) {
    describe('---- Post Item -------', () => {
        /*
        * Test the /POST products
        */
        it('it should POST a product', (done) => {
            chai.request(server)
                .post('/services/postproduct')
                .set('X-API-Key', 'foobar')
                .set('Authorization', `Bearer ${token}`)
                .field('title', 't1')
                .field('description', 'des1')
                .field('condition', 'Very Good')
                .field('price', '6')
                .attach('imageField', fs.readFileSync('test/test_image/img2.jpg'), 'img2.jpg')
                .end((err, res) => {
                    // console.log('*******')
                    //console.log(res.body) //error no token provide
                    testGetItem(res.body.postId)
                    expect(res.body.status).to.be.eql('post complete.')
                    done()
                })
        })
    })
}
function testGetItem(id){
    describe('---- get one Item -------', () => {
        /*
        * Test the /POST products
        */
        it('it should get a product', (done) => {
            chai.request(server)
                .get('/services/getproduct/'+id)
                .end((err, res) => {
                    console.log('product____')
                    console.log(res.body)
                    //expect(res).to.have.status(200)
                })
        })
    })
}
function testPostDataNoImage(token) {
    describe('---- Post Item NoImage-------', () => {
        /*
        * Test the /POST products
        */
        it('it should POST a product', (done) => {
            chai.request(server)
                .post('/services/postproduct')
                .set('X-API-Key', 'foobar')
                .set('Authorization', `Bearer ${token}`)
                .field('title', 't1')
                .field('description', 'des1')
                .field('condition', 'Very Good')
                .field('price', '6')
                .end((err, res) => {
                    // console.log('*******')
                    // console.log(res.body) //error no token provide
                    expect(res.body.status).to.be.eql('post complete.')
                    done()
                })
        })
    })
}
function testPostDataNotLogin() {
    describe('---- Post Item Not login -------', () => {
        /*
        * Test the /POST products
        */
        it('it should POST a product', (done) => {
            chai.request(server)
                .post('/services/postproduct')
                .set('X-API-Key', 'foobar')
                .field('title', 't1')
                .field('description', 'des1')
                .field('condition', 'Very Good')
                .field('price', '6')
                .attach('imageField', fs.readFileSync('test/test_image/img2.jpg'), 'img2.jpg')
                .end((err, res) => {
                    // console.log('*******')
                    // console.log(res.body) //error no token provide
                    expect(res.body.error).to.be.eql('No token provided')
                    done()
                })
        })
    })
}
function testPostDataPriceLessThan0(token) {
    describe('---- Post Item Price less than 0-------', () => {
        /*
        * Test the /POST products
        */
        it('it should POST a product', (done) => {
            chai.request(server)
                .post('/services/postproduct')
                .set('X-API-Key', 'foobar')
                .set('Authorization', `Bearer ${token}`)
                .field('title', 't1')
                .field('description', 'des1')
                .field('condition', 'Very Good')
                .field('price', '-1')
                .end((err, res) => {
                    expect(res.body.errors.price.message).to.be.eql('Path `price` (-1) is less than minimum allowed value (0).')
                    done()
                })
        })
    })
}


