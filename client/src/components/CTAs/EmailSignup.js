import React from 'react'
import { Box, Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { FaRegEnvelope } from 'react-icons/fa'

const EmailSignup = ({action}) => {
  return (
    <> 
      <Box>
        <div id="mc_embed_signup">
          <form action={action} method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
            <div id="mc_embed_signup_scroll">
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<FaRegEnvelope color='gray.300' />}
                />
                <Input 
                  id="mce-EMAIL" 
                  className="email"
                  name="EMAIL"
                  type='email' 
                  placeholder='Email address' 
                  isRequired={true}
                  mr='3'
                />
                <div id="hidden-mc-field" aria-hidden="true">
                  <input type="text" name="b_c206d0bc37dc43c7920af49f4_90e19a98e1" tabIndex="-1" defaultValue="" />
                </div>
                <Button
                  colorScheme='red'
                  name="subscribe" 
                  type="submit"
                >
                  Submit
                </Button>
              </InputGroup>
            </div>
          </form>
        </div>
      </Box>
    </>
  )
}

export default EmailSignup