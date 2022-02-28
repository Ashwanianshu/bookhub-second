import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

import {AiOutlineClose} from 'react-icons/ai'
import Cookies from 'js-cookie'

import './index.css'
import BookContext from '../../Context/bookContext'

class Navbar extends Component {
  state = {
    isHamburgerDown: false,
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  scrollOptions = () => (
    <BookContext.Consumer>
      {value => {
        const {alterActiveRoute} = value
        const activeRouteNavbar = localStorage.getItem('activeLink')
        let HomeClass = ''
        let booksClass = ''
        if (activeRouteNavbar === 'home') {
          HomeClass = 'navbar-menu-section-content-blue'
        } else if (activeRouteNavbar === 'bookshelves') {
          booksClass = 'navbar-menu-section-content-blue'
        }
        const changeToHome = () => {
          alterActiveRoute('home')
        }
        const changeToBooks = () => {
          alterActiveRoute('bookshelves')
        }
        return (
          <ul className="options-container">
            <li className="nav-menu-item">
              <Link
                onClick={changeToHome}
                to="/"
                className={`nav-link ${HomeClass}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link
                to="/shelf"
                onClick={changeToBooks}
                className={`nav-link ${booksClass}`}
              >
                Bookshelves
              </Link>
            </li>
            <button
              onClick={this.onClickLogout}
              className="logout-desktop-button"
              type="button"
            >
              Logout
            </button>
          </ul>
        )
      }}
    </BookContext.Consumer>
  )

  onClickNavbar = () => {
    this.setState(prevState => ({
      isHamburgerDown: !prevState.isHamburgerDown,
    }))
  }

  buttonContainer = () => {
    const {isHamburgerDown} = this.state
    return !isHamburgerDown ? (
      <button
        type="button"
        className="nav-bars-button"
        onClick={this.onClickNavbar}
      >
        <FaBars className="nav-bars" />
      </button>
    ) : (
      <button
        type="button"
        className="close-button"
        onClick={this.onClickNavbar}
      >
        <AiOutlineClose className="close-logo" />
      </button>
    )
  }

  navBarContent = () => (
    <BookContext.Consumer>
      {value => {
        const {alterActiveRoute} = value
        const {isHamburgerDown} = this.state
        const activeRouteNavbar = localStorage.getItem('activeLink')
        let HomeClass = ''
        let booksClass = ''
        if (activeRouteNavbar === 'home') {
          HomeClass = 'navbar-menu-section-content-blue'
        } else if (activeRouteNavbar === 'bookshelves') {
          booksClass = 'navbar-menu-section-content-blue'
        }
        const changeToHome = () => {
          alterActiveRoute('home')
        }
        const changeToBooks = () => {
          alterActiveRoute('bookshelves')
        }
        return (
          <nav className="nav-header" fixed="true">
            <div className="nav-content">
              <div className="navbar-mobile-logo-main-container">
                <div className="navbar-mobile-logo-container">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/saikrishnaboga-ccbp-tech/image/upload/v1643539861/Book-Hub%20/Group_7731login-B-logo_vneo4x.png"
                      alt="website logo"
                      className="website-logo"
                    />
                  </Link>
                  {this.buttonContainer()}
                </div>
                <div className="scroll-options-container">
                  {isHamburgerDown && this.scrollOptions()}
                </div>
              </div>
              <div className="navbar-desktop-container">
                <Link to="/" className="nav-link">
                  <img
                    src="https://res.cloudinary.com/saikrishnaboga-ccbp-tech/image/upload/v1643539861/Book-Hub%20/Group_7731login-B-logo_vneo4x.png"
                    alt="website logo"
                    className="website-logo"
                  />
                </Link>
                <ul className="nav-menu">
                  <li className="nav-menu-item">
                    <Link
                      onClick={changeToHome}
                      to="/"
                      className={`nav-link ${HomeClass}`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-menu-item">
                    <Link
                      onClick={changeToBooks}
                      to="/shelf"
                      className={`nav-link ${booksClass}`}
                    >
                      Bookshelves
                    </Link>
                  </li>
                  <button
                    className="logout-desktop-button"
                    onClick={this.onClickLogout}
                    type="button"
                  >
                    Logout
                  </button>
                </ul>
              </div>
            </div>
          </nav>
        )
      }}
    </BookContext.Consumer>
  )

  render() {
    return this.navBarContent()
  }
}

export default withRouter(Navbar)
