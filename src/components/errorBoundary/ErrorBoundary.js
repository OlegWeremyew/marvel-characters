import { Component } from 'react';

import { ErrorMessage } from '../errorMessage';

class ErrorBoundary extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);

    this.setState({
      error: true,
    });
  }

  render() {
    const { state, props } = this;
    if (state.error) {
      return <ErrorMessage />;
    }

    return props.children;
  }
}

export default ErrorBoundary;
