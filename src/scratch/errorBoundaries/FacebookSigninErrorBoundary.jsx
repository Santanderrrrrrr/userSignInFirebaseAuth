import React, { Component, useContext } from 'react'
import { GlobalContext } from '../../ContextApi/GlobalContext';


const { isFacebookError, setIsFacebookError } = useContext(GlobalContext);

export class FacebookSigninErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: false
        }
    }

  render() {
    return (
      <div>FacebookSigninErrorBoundary</div>
    )
  }
}

export default FacebookSigninErrorBoundary