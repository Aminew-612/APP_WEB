import React from 'react'

import { Form, Input, Button } from 'antd';
export default function UserForm() {


  const [formUser] = Form.useForm(); //Controlar el fromulario

  const handleSubmit = () => {
    const values = formUser.getFieldsValue(); //obtener todos los datos en JSON

    console.log('Todos los datos del formulario: ', values)

  
  };

  
  return (
    <div>
    <Form
      name="layout-multiple-horizontal"
      layout="horizontal"
      form={formUser}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item label="Username" name="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="Password" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="E-mail" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      

      <br></br>


      <Form.Item>
        <Button onClick={handleSubmit}>

          Enviar

        </Button>

      </Form.Item>



    </Form>

      
    </div>
  )
}
