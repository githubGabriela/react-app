import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Utils from '../../../utils/Utils';
import * as DataSource from '../../../config/DataSource';
import '../../../assets/css/General.scss';

class ImagePopup extends Component {
    constructor(){
        super();
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
        this.handleImageChange = this.handleImageChange.bind(this);
    }

        handleImageChange(e) {
            Utils.preventDefault(e);
            let reader = new FileReader();
            let file = e.target.files[0];
        
            if(file){
            reader.onloadend = () => {
              this.setState({
                file: file,
                imagePreviewUrl: reader.result
              });
            }
            reader.readAsDataURL(file);
            DataSource.saveImage(this.props.categoryName, file);
        }
    }

    getImage(){ 
        DataSource.getImage(this.props.categoryName);
    }

    removeImage(){
        DataSource.removeImage(this.props.categoryName);
    }


    render() {
        return (
           <div>
               <form className="item-image category-image">
               <input type="file" name="file" className="input-file" onChange={(event) => this.handleImageChange(event)} /> 
                    <FontAwesome name="pencil" className="input-file-pencil"/>
                    <div className="file-image">
                        { this.state.imagePreviewUrl ? 
                            <img className="" src={this.state.imagePreviewUrl} />
                        : null
                        }
                    </div>
               </form>

               <button onClick={this.getImage.bind(this)}> get </button>
               <button onClick={this.removeImage.bind(this)}> remove </button>
            </div>

        );
}

}

export default ImagePopup;
