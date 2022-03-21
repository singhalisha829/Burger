import React ,{ Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler';

import classes from '../ContactData/ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../Store/actions/index';
import { updateObject } from '../../../shared/utility';

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5,
                    isNumeric:true
                },
                valid: false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid: false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'},

                    ]
                },
                value:'fastest',
                validation:{
                    required:true
                },
                valid:true
            },
        },
        // loading: false,
        formIsValid: false,
        // user:null
    }

    orderHandler= (event) =>{
        event.preventDefault();
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order ={
                ingredients: this.props.ings,
                price: this.props.price,
                orderData: formData,
                isFav:this.props.isFav,
                isCoke:this.props.isCoke,
                userId:this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
            // axios.post('/orders.json',order)
            // .then(response => {
            //     this.setState({loading:false})
            //     this.props.history.push('/');
            // })
            // .catch(error => {
            //     this.setState({loading:false})
            // });
    }   

    checkValidity(value, rules){
        let isValid= true;
        if(rules.required){
            isValid=value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid= value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid= value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;

    }

    inputChangedHandler=( event, inputIdentifer)=>{
        
        const updatedFormElement=updateObject(this.state.orderForm[inputIdentifer], {
            value:event.target.value,
            valid:this.checkValidity(event.target.value, this.state.orderForm[inputIdentifer].validation),
            touched:true
        });

        const updatedOrderForm=updateObject(this.state.orderForm,{
            [inputIdentifer]: updatedFormElement
        })
      
        
        let formIsValid= true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid= updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm, formIsValid: formIsValid, user:this.props.user})
    }
    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form=(<form onSubmit={this.orderHandler}>    
             {formElementsArray.map(fromElement => (
                <Input 
                 key={fromElement.id}
                 elementType={fromElement.config.elementType}
                 elementConfig={fromElement.config.elementConfig} 
                 value={fromElement.config.value}
                 shouldValidate={fromElement.config.validation}
                 inValid={!fromElement.config.valid}
                 touched={fromElement.config.touched}
                 changed={(event)=> this.inputChangedHandler(event, fromElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);
        if(this.props.loading){
            form= <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token: state.auth.token,
        isFav:state.order.isFav,
        isCoke:state.order.isCoke,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger: (orderData ,token) => dispatch(actions.purchaseBurger(orderData ,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactData, axios));