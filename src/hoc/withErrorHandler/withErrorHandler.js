import React,{Component} from 'react';
import More from '../More';
import Modal from '../../Component/FrontEnd/Model/Model';

const errorHandler = (WrappedComponent,axios) => {
    return class extends Component{
        
        state = {
            error : null
        }

        componentWillMount() {

            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState ({error : null})
                return request;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res,error => {
                this.setState ({error : error})
            })
        }

        componentWillUnmount() {
            console.log("from will mount",this.reqInterceptor,this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        onClickHandler = () => {
            this.setState ({error : null})
        }

        render(){
            return (
                <More>
                <Modal show = {this.state.error}
                        modalClick = {this.onClickHandler}> 
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </More>
            )
        }
    }
}

export default errorHandler