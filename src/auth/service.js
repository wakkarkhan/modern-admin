import defaultConfig from './defaultConfig'
import axios from 'axios'

export default class service {
  axiosIns = axios.create({
    // You can add your headers here
    // ================================
    baseURL: 'https://propertise.api.nodejsapi.ml',
  })

  config = { ...defaultConfig }

  setToken(value) {
    localStorage.setItem(this.config.storageTokenKeyName, value)
  }

  //   login function
  login(...args) {
    let headers = {
      'Content-Type': 'application/json',
    }
    return this.axiosIns.post(this.config.loginEndpoint, ...args, {
      headers: headers,
    })
  }

  //   get all buildings record
  getAllBuildings(...args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
      'Content-Type': 'application/json',
    }
    return this.axiosIns.post(this.config.getAllBuildingsEndPoint, ...args, {
      headers: headers,
    })
  }

  //   get dashboard summary
  getDashboardSummary() {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
    }
    return this.axiosIns.get(this.config.dashboardSummaryEndPoint, {
      headers: headers,
    })
  }

  // add new building
  addBuilding(...args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
      'Content-Type': 'application/json',
    }
    return this.axiosIns.post(this.config.addBuildingEndPoint, ...args, {
      headers: headers,
    })
  }

  // edit building
  editBuilding(...args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
      'Content-Type': 'application/json',
    }
    return this.axiosIns.put(this.config.addBuildingEndPoint, ...args, {
      headers: headers,
    })
  }

  //  delete Building
  deleteBuilding(args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
    }
    return this.axiosIns.delete('https://propertise.api.nodejsapi.ml/corporate/building/' + args, {
      headers: headers,
    })
  }

  // get floors pagination
  getAllFloors(...args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
      'Content-Type': 'application/json',
    }
    return this.axiosIns.post('https://propertise.api.nodejsapi.ml/corporate/floor/get', ...args, {
      headers: headers,
    })
  }

  //   get floors
  // getAllFloors(args) {
  //   console.log(args.params.buildingId)
  //   let data = args.params.buildingid

  //   var config = {
  //     method: 'get',
  //     url: 'https://propertise.api.nodejsapi.ml/corporate/floor?buildingId=' + args.params.buildingId,
  //     headers: {
  //       authorization:
  //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZmMzdiMDAzMWNiNzJkYjg0NGU4NDMiLCJhdXRoVG9rZW4iOjU1MTI1OSwidXNlclR5cGUiOjAsInN0YXR1cyI6IkxvZ2luIiwiZ2VuZXJhdGVkT24iOjE2Nzc3NTA4NTIyNjQsImlhdCI6MTY3Nzc1MDg1Mn0.rPSq7y3mjezRyOclRHWVaSEXEDunGzlEdc-LYABx_to',
  //     },
  //   }

  //   return axios(config)
  // }

  // add new building
  addFloor(...args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
      'Content-Type': 'application/json',
    }
    return this.axiosIns.post(this.config.addFloorEndPoint, ...args, {
      headers: headers,
    })
  }

  // edit building
  editFloor(...args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
      'Content-Type': 'application/json',
    }
    return this.axiosIns.put(this.config.addFloorEndPoint, ...args, {
      headers: headers,
    })
  }

  //  delete Floor
  deleteFloor(args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
    }
    return this.axiosIns.delete('https://propertise.api.nodejsapi.ml/corporate/floor/' + args, {
      headers: headers,
    })
  }

  //   get units pagination
  getAllUnits(...args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
      'Content-Type': 'application/json',
    }
    return this.axiosIns.post(this.config.getUnitsEndPoint, ...args, {
      headers: headers,
    })
  }

  // add add units
  addUnits(...args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
      'Content-Type': 'application/json',
    }
    return this.axiosIns.post(this.config.addUnitsEndPoint, ...args, {
      headers: headers,
    })
  }

  //  delete Unit
  deleteUnit(args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
    }
    return this.axiosIns.delete('https://propertise.api.nodejsapi.ml/corporate/unit/' + args, {
      headers: headers,
    })
  }

  // get
  getUnit(args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
    }
    return this.axiosIns.get('https://propertise.api.nodejsapi.ml/corporate/unit/' + args, {
      headers: headers,
    })
  }

  //
  editUnit(...args) {
    let headers = {
      Authorization: JSON.parse(localStorage.getItem('accessToken')),
      'Content-Type': 'application/json',
    }
    return this.axiosIns.put('https://propertise.api.nodejsapi.ml/corporate/unit', ...args, {
      headers: headers,
    })
  }
}
