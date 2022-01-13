import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";

export default class AddPets extends Component {

  state = {
    title: '',
    content: '',
    image: null
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('name', this.state.name);
    form_data.append('shelter', '1');
    console.log(form_data)
    let url = 'http://localhost:8000/api/pet/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
  };

  render() {
    const { toggle, onSave } = this.props;
  
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Animal to Shelter</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={this.state.name} 
                onChange={this.handleChange}
                placeholder="Enter the name of the animal"
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg"  
                onChange={this.handleImageChange}
                placeholder="Please enter an image of the animal"
              />
            </FormGroup>
            <Button
            color="success"
            type="submit"
          >
            Save
          </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}