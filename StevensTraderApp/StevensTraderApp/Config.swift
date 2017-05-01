//
//  Config.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 3/18/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit

class Config: NSObject
{
    static var userInfo:User? = nil
    static func getServerIP()  -> String {
        guard let infoPlist = Bundle.main.infoDictionary,
            let serverip = infoPlist["serverip"] as? String else {
                print("missing config server ip")
                return ""
        }
        return serverip
    }
    
    static func setUser(name:String,email:String)
    {
        self.userInfo = User(name:name,email:email)
    }
    
    static func getUser() -> User?
    {
        return self.userInfo
    }
    

}

