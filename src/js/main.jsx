var Food = React.createClass({
        getInitialState:function(){
            return {editing:false};
        },
        edit:function(){
            this.setState({editing:true});
        },
        delete:function(){
            this.props.removeFoodEvent(this.props.index);
        },
        save:function(){
            this.props.updateFoodEvent(this.refs.newText.value, this.props.index);
            this.setState({editing:false});
        },
        renderNormal:function(){
            return (<tr>
                        <td>{this.props.children}</td>
                        <td><button onClick={this.edit}>Edit</button>
                        <button onClick={this.delete}>Delete</button></td>
                    </tr>);
        },
        renderForm:function(){
            return (<div>
                        <input type="text" ref="newText" defaultValue={this.props.children} />
                        <button onClick={this.save}>Save</button>
                    </div>);
        },
        render:function(){
            if(this.state.editing==true)
                return this.renderForm();
            else
                return this.renderNormal();
        }
    });

    var FoodList = React.createClass({
        addFood:function(){
            var arr = this.state.foods;
            arr.push({foodname:this.refs.newText.value,category:"text",calories:10});
            this.setState({foods:arr});
            this.refs.newText.value = '';
        },

        getInitialState:function(){
            return {foods:[{
                        foodname:"Spaghetti",
                        category:"Dessert",
                        calories:150
                    },
                    {
                        foodname:"Afritada",
                        category:"Main Course",
                        calories:200
                    }
                ]};
        },

        removeFood:function(i){
            var arr = this.state.foods;
            arr.splice(i,1);
            this.setState({foods:arr});
        },

        updateFood:function(newText,i){
            var arr= this.state.foods;
            arr[i].foodname = newText;
            this.setState({foods:arr});
        },

        eachFood:function(item,i){
            return (<Food calories={item.calories} removeFoodEvent={this.removeFood} updateFoodEvent={this.updateFood}
                    key={i} index={i} category={item.category}>
                {item.foodname}
            </Food>);
        },
        render:function(){
            return (<table className="table table-responsive table-bordered table-striped" >
                        {
                            this.state.foods.map(this.eachFood)
                        }
                        <tr>
                            <td><input type="text" ref="newText" /></td>
                            <td><button onClick={this.addFood}>Add</button></td>
                        </tr>
                    </table>);
        }
    });

ReactDOM.render(<FoodList />,document.getElementById('container'));