//
//  Config.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 3/18/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit

class Config: NSObject {
    static func getServerIP()  -> String {
        guard let infoPlist = Bundle.main.infoDictionary,
            let serverip = infoPlist["serverip"] as? String else {
                print("missing config server ip")
                return ""
        }
        return serverip
    }
    enum ConfigError:Error {
        case serverip
    }

}

