import chai from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'
import server from '../src/server'
import {dbPath} from '../src/config'
import Item from '../src/models/item'
import TempAccount from '../src/models/temp_account'
import fs from 'fs'
import {imageDir} from '../src/config/pathConfig'
const {expect,should} = chai;

chai.use(chaiHttp);

before((done) => { //Before each test we empty the database
    TempAccount.remove({}, (err) => {
        Item.remove({}, (err) => {
            done()
        })
    })
})

describe('---- Account Testing -------', () => {
    /*
    * Test Server Entrance
    */
    it('should work',function(){
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
    function signupTestFunction(server){
        return chai.request(server)
            //post json
            .post('/services/signup')
            .set('X-API-Key', 'foobar')
            .send({ name:'aaa', password: '123', email: 'exitudio@exit.com', type:'register' })
    }
})
describe('---- Item Testing -------', () => {
    /*
    * Test the /POST products
    */
    it('it should POST a product', (done) => {
        chai.request(server)
            .post('/services/postproduct')
            .set('X-API-Key', 'foobar')
            .field('title','t1')
            .field('description','des1')
            .field('condition','Very Good')
            .field('price','6')
            .attach('imageField', fs.readFileSync('test/test_image/img2.jpg'), 'img2.jpg')
            .end((err, res) => {
                expect(res.body.status).to.be.eql('post complete.')
                done()

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

                                res.body.products.forEach(product=>{
                                    product.medias.forEach(media=>{
                                        fs.unlink(imageDir+media.imageName, ()=>{})
                                        fs.unlink(imageDir+media.thumbnailName, ()=>{})
                                    })
                                })
                                // expect(res.body).to.be.a('array')
                                // expect(res.body.length).to.be.eql(0)
                                done()
                            })
                    })
                })
            })
    })
})
