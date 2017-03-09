import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Login from '../views/components/login/Login'

describe('Login (Snapshot)', () => {
  it('Login renders', () => {
    const component = renderer.create(<Login />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})

describe('---- Item Testing -------', () => {
        it('Login warning',()=>{
            console.log('----------------------------')
            const login = shallow(<Login />)
            login.setState({isEmailCorrect:true, 
                    isPasswordCorrect:true, })

            console.log(login.find('.warning'))
            expect(login.find('.warning')).toEqual('Hello world')


            // isEmailCorrect:true, 
            //         isPasswordCorrect:true, 
        })
    })