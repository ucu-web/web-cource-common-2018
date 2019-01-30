import React, { Component } from 'react'
import './App.css'
import Person from '../Person/Person'

export default class App extends Component {
  state = {
    antichrists: null,
    cristians: null,
  }

  clickHandler = null

  constructor() {
    super()

    this.recalculatePosition = this.recalculatePosition.bind(this)
    this.restart = this.restart.bind(this)
  }

  recalculatePosition() {
    if (this.state.antichrists === null) {
      return
    }
    let anti = [...this.state.antichrists].map(obj => {
      return { ...obj }
    })
    let cristi = [...this.state.cristians].map(obj => {
      return { ...obj }
    })
    let punished = []
    let bumped = []
    for (let i = 0; i < anti.length; ++i) {
      let punishment = false

      if (anti[i].x <= 0) {
        anti[i].xMove = Math.abs(anti[i].xMove)
      } else if (anti[i].x >= 485) {
        anti[i].xMove = -Math.abs(anti[i].xMove)
      }

      if (anti[i].y <= 0) {
        anti[i].yMove = Math.abs(anti[i].yMove)
      } else if (anti[i].y >= 285) {
        anti[i].yMove = -Math.abs(anti[i].yMove)
      }

      let multiplier = anti.length <= 2 ? 1 : 0.5
      anti[i].x += anti[i].xMove * multiplier
      anti[i].y += anti[i].yMove * multiplier

      if (bumped.includes(i)) {
        continue
      }
      for (let j = 0; j < this.state.antichrists.length; j++) {
        if (i === j) {
          continue
        }

        if (App.areVeryOverlapped(anti[i], anti[j])) {
          anti[i] = this.movedToSafePlace(anti[i])
        } else if (App.areOverlapped(anti[i], anti[j])) {
          bumped.push(i)
          bumped.push(j)

          let tempXMove = anti[j].xMove
          let tempYMove = anti[j].yMove

          anti[j].xMove = anti[i].xMove
          anti[j].yMove = anti[i].yMove

          anti[i].xMove = tempXMove
          anti[i].yMove = tempYMove

          anti[i].x += anti[i].xMove
          anti[i].y += anti[i].yMove
        }
      }

      if (this.state.cristians === null) {
        continue
      }
      for (let j = 0; j < this.state.cristians.length; j++) {
        let cristi = this.state.cristians[j]
        if (App.areVeryOverlapped(anti[i], cristi)) {
          anti[i] = this.movedToSafePlace(anti[i])
        } else if (App.areOverlapped(anti[i], cristi)) {
          if (!anti[i].good) {
            punished.push([cristi.id, anti[i].id])
          }
          punishment = true
        }
      }
      if (punishment) {
        anti[i].xMove *= -1
        anti[i].yMove *= -1
        anti[i].x += anti[i].xMove
        anti[i].y += anti[i].yMove
      }

      if (anti[i].x < 285) {
        anti[i].good = false
      }

      if (anti[i].x < 0) {
        anti[i].x = 0
      }
      if (anti[i].y < 0) {
        anti[i].y = 0
      }
      if (anti[i].x > 485) {
        anti[i].x = 485
      }
      if (anti[i].y > 285) {
        anti[i].y = 285
      }
    }

    let newAntichrists = []
    for (let i = 0; i < punished.length; ++i) {
      let cristiId = punished[i][0]
      let cristi = this.state.cristians.filter(
        cristi => cristi.id === cristiId
      )[0]
      let antiId = punished[i][1]
      let antic = this.state.antichrists.filter(
        antichrist => antichrist.id === antiId
      )[0]
      newAntichrists.push({
        id: anti[anti.length - 1].id + i + 1,
        x: cristi.x,
        y: cristi.y,
        xMove: antic.xMove,
        yMove: antic.yMove,
        good: true,
      })
    }

    for (let i = 0; i < newAntichrists.length; ++i) {
      anti.push(newAntichrists[i])
    }
    cristi = cristi.filter(
      cristian => !punished.map(pair => pair[0]).includes(cristian.id)
    )

    for (let i = 0; i < cristi.length; ++i) {
      cristi[i].id = i
      cristi[i].x = App.calculateCristianPosition(i, cristi.length)[0]
      cristi[i].y = App.calculateCristianPosition(i, cristi.length)[1]
    }

    this.setState({ antichrists: anti, cristians: cristi })
  }

  movedToSafePlace(obj, isCristian = false) {
    let overlap = true
    while (overlap) {
      obj.x += obj.xMove
      obj.y += obj.yMove
      overlap = false
      for (let i = 0; i < this.state.antichrists.length; ++i) {
        let anti = this.state.antichrists[i]
        if (!isCristian && obj.id === anti.id) {
          continue
        }
        if (App.areOverlapped(obj, anti)) {
          overlap = true
          break
        }
      }
      if (overlap) {
        continue
      }
      for (let i = 0; i < this.state.cristians.length; ++i) {
        let cristi = this.state.cristians[i]
        if (isCristian && obj.id === cristi.id) {
          continue
        }
        if (App.areOverlapped(obj, cristi)) {
          overlap = true
          break
        }
      }
    }
    return obj
  }

  static generatePyramidStructure(total) {
    let steps = [1]
    while (steps.reduce((a, b) => a + b, 0) < total) {
      let next = steps[steps.length - 1] + 1
      if (steps.reduce((a, b) => a + b, 0) + next <= total) {
        steps.push(next)
      } else {
        break
      }
    }
    let rest = total - steps.reduce((a, b) => a + b, 0)

    if (rest > 0) {
      steps.push(rest)
    }

    steps.sort((a, b) => a - b)

    return steps
  }

  static calculateCristianPosition(index, total) {
    let interval = 20
    let baselineX = 480
    let baselineY = 150
    let groupNumber = 0
    let inGroupNumber = 0
    let groupCount = App.generatePyramidStructure(total)
    let groupCountIndex = 0
    let iter = 0
    while (iter !== index) {
      if (inGroupNumber === groupCount[groupCountIndex]) {
        groupCountIndex += 1
        inGroupNumber = 0
        groupNumber += 1
      }
      inGroupNumber += 1
      iter += 1
      if (inGroupNumber === groupCount[groupCountIndex]) {
        groupCountIndex += 1
        inGroupNumber = 0
        groupNumber += 1
      }
    }
    let calculatedX = baselineX - groupNumber * interval
    let extraShift = 0
    if (groupCount[groupCountIndex] % 2 === 0) {
      extraShift = Number(interval / 2)
    }
    if (groupCount[groupCountIndex] === undefined) {
      groupCountIndex -= 1
    }

    let calculatedY =
      baselineY +
      extraShift -
      (Math.floor(groupCount[groupCountIndex] / 2) - inGroupNumber) * interval
    // console.log(calculatedX, calculatedY)
    return [calculatedX, calculatedY]
  }

  generateRandomAntichrists(n) {
    let anti = []
    let i = 0
    while (i < n) {
      let antichrist = {
        id: i,
        x: Math.floor(Math.random() * 270) + 1,
        y: Math.floor(Math.random() * 270) + 1,
        xMove: 0.5,
        yMove: 0.5,
        good: false,
      }
      antichrist.xMove =
        Math.random() < 0.5 ? antichrist.xMove : -antichrist.xMove
      antichrist.yMove =
        Math.random() < 0.5 ? antichrist.yMove : -antichrist.yMove

      let overlapped = false
      for (let j = 0; j < anti.length; ++j) {
        if (App.areOverlapped(antichrist, anti[j])) {
          overlapped = true
        }
      }
      if (overlapped) {
        continue
      }

      anti.push(antichrist)
      i += 1
    }
    this.setState({ antichrists: anti })
  }

  generateCristians(n) {
    let cristi = []
    for (let i = 0; i < n; ++i) {
      let cristian = {
        id: i,
        x: App.calculateCristianPosition(i, n)[0],
        y: App.calculateCristianPosition(i, n)[1],
      }
      cristi.push(cristian)
    }
    this.setState({ cristians: cristi })
  }

  static areVeryOverlapped(instance1, instance2) {
    return App.areOverlapped(instance1, instance2, 12)
  }

  static areOverlapped(instance1, instance2, threshold = 15) {
    return (
      Math.pow(
        Math.pow(instance1.x - instance2.x, 2) +
          Math.pow(instance1.y - instance2.y, 2),
        0.5
      ) < threshold
    )
  }

  render() {
    if (this.state.antichrists === null || this.state.cristians === null) {
      return <p>Loading...</p>
    } else if (this.state.antichrists.length === 0) {
      return (
        <div className="App App_win">
          <button onClick={this.restart}>New game</button>
          <h1 className="App__text">Catholics won😇</h1>
        </div>
      )
    } else if (this.state.cristians.length === 0) {
      return (
        <div className="App App_lose">
          <button onClick={this.restart}>New game</button>
          <h1 className="App__text">Antichrists won😈</h1>
        </div>
      )
    }
    return (
      <div className="App" id="App">
        {this.state.antichrists.map(antichrist => (
          <Person
            key={antichrist.id}
            id={antichrist.id}
            x={antichrist.x}
            y={antichrist.y}
            personality={{ isAnti: true, isGoodAnti: antichrist.good }}
          />
        ))}
        {this.state.cristians.map((cristian, index) => (
          <Person
            key={cristian.id}
            id={cristian.id}
            x={cristian.x}
            y={cristian.y}
            personality={{ isAnti: false, isPop: cristian.id === 0 }}
          />
        ))}
        <div className="Church" />
      </div>
    )
  }

  restart() {
    this.generateRandomAntichrists(this.props.antichrists)
    this.generateCristians(this.props.cristians)
  }

  componentDidMount() {
    this.restart()
    window.webkitRequestAnimationFrame(this.recalculatePosition)
  }

  componentDidUpdate() {
    if (this.clickHandler === null) {
      this.clickHandler = true
      this.addClickHandler()
    }
    window.webkitRequestAnimationFrame(this.recalculatePosition)
  }

  addClickHandler() {
    document.getElementById('App').addEventListener('click', event => {
      let click_obj = { x: event.clientX, y: event.clientY }
      for (let i = 0; i < this.state.antichrists.length; ++i) {
        if (App.areOverlapped(click_obj, this.state.antichrists[i], 15)) {
          this.handleAntichristClick(this.state.antichrists[i].id)
          break
        }
      }
    })
  }

  handleAntichristClick(antichrist_id) {
    let anti = this.state.antichrists.filter(
      antichrist => antichrist.id !== antichrist_id
    )

    let cristi = [...this.state.cristians].map(obj => {
      return { ...obj }
    })

    cristi.push({
      id: cristi[cristi.length - 1].id + 1,
    })

    for (let i = 0; i < cristi.length; ++i) {
      cristi[i].id = i
      cristi[i].x = App.calculateCristianPosition(i, cristi.length)[0]
      cristi[i].y = App.calculateCristianPosition(i, cristi.length)[1]
    }

    this.setState({ antichrists: anti, cristians: cristi })
  }
}