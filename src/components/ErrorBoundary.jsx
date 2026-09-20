import {Component} from "react";
export default class ErrorBoundary extends Component {
  state={hasError:false,error:null};
  static getDerivedStateFromError(error){return {hasError:true,error};}
  componentDidCatch(error,info){console.error("LIFE//THREADS render error",error,info);}
  render(){
    if(!this.state.hasError)return this.props.children;
    return <main className="loading" role="alert"><div className="loader-mark">!</div><span className="eyebrow">LIFE//THREADS</span><h1>Something went wrong.</h1><p>The interface hit an unexpected rendering error. Your local data is not sent anywhere.</p><button className="primary" onClick={()=>location.reload()}>Reload application</button></main>;
  }
}
