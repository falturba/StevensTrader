//
//  Config.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 3/18/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit

class Config: NSObject {
    static func getServerIP() throws -> String {
        guard let infoPlist = Bundle.main.infoDictionary,
            let serverip = infoPlist["serverip"] as? String else {
                throw ConfigError.serverip
        }
        return serverip
    }
    enum ConfigError:Error {
        case serverip
    }

}

