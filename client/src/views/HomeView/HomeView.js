import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as counterActions } from '../../redux/modules/counter'
import DuckImage from './Duck.jpg'
import classes from './HomeView.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
})
export class HomeView extends React.Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className="home">
        <div className={classes.homeHero}>
          <div>
            <div className={classes.homeHeroOverTitle}>
              in Oakland, CA
            </div>
            <h1 className={classes.homeHeroTitle}>400 people go hungry every month</h1>
          </div>
          <div className={classes.learnMore}>
            Learn More
          </div>
        </div>
        <div className={classes.solveable}>
          <h2>Hunger is solveable.</h2>
        </div>
        <div className={classes.howItWorks}>
          <div className={classes['howItWorks--lead']}>
            <div>$10/month</div>
            <img src="http://www.inmotionhosting.com/support/images/stories/icons/ecommerce/cash-dark.png"/>
            <div>You Contribute Monthly</div>
          </div>
          <div className={classes['howItWorks--final']}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Food_Bank_icon.svg/2000px-Food_Bank_icon.svg.png"/>
            <div>We Ship Weekly</div>
          </div>
        </div>
        <div className={classes.impact}>
          <div className={classes['impact--lead']}>
            <div className={classes['impact--understand']}>
              Understand your impact
            </div>
            <div className={classes['impact--p']}>
              You&quot;ll get updates every month on who your contributions have been helping
            </div>
          </div>
          <div className={classes['impact--final']}>
            <img src="http://i.stack.imgur.com/KOICW.png"/>
          </div>
        </div>
        <div className={classes.quote}>
          <div className={classes['quote--container']}>
            <div className={classes['quote--lead']}>
              <img className={classes['quote--avatar']}
                  src="https://0.gravatar.com/avatar/ce684af666c4e91ba6c876444014547f?s=120&d=retro&r=G"/>
            </div>
            <div className={classes['quote--final']}>
            A lot of our kids eat poor food, like spicy chips and candy. It is hard to focus on learning when coming down from a sugar high
            <br/>
            <br/>
            – Emma Coufal, Oakland Unified School District
            </div>
          </div>
        </div>
        <div className={classes.cta}>
          <div className={classes.ctaText}>
            Be the first to help us fight hunger in Oakland, CA
          </div>
          <a href="/patrons/new" className={classes.ctaButton}>Contribute</a>

        </div>

      </div>

    )
  }
}

// <Link to='/patrons/new'>Contribute</Link>
// <Link to='/clients/new'>Apply for Food</Link>
export default connect(mapStateToProps, counterActions)(HomeView)
