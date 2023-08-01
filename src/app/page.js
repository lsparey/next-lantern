"use client"
import React, {useState, useEffect} from "react"
import {Formik, Form, ErrorMessage} from "formik"
import ThemeProvider from "@mft/lantern/theme-provider"
import GlobalStyle from "@mft/lantern/global-styles"
//import {ThemeProvider, GlobalStyle} from "@mft/lantern"
import {ContentWrapper, Box, Stack, Text, TextInput, Button, Modal} from "@mft/lantern"
import baseTheme from "./theme.json"

const GreetingModal = ({modalIsOpen, closeModal, name}) => {
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <Text>Greetings {name}</Text>
      <Button width="full" onClick={closeModal} variant={"tertiary"} type="button">
        Close
      </Button>
    </Modal>
  )
}

export default function Home() {
  const [theme, setTheme] = useState(baseTheme)
  const [appName, setAppName] = useState("Next")
  const [name, setName] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)
 
  useEffect(() => {
    const fetchData = async () => {
      const businessId = "0f1ae6c5-4a71-4d30-9f1c-44743c1b94f6"
      const moneyhubTenantId = "94d46269b0c2b7ecce341c094fdb9a809cd0a49b43a4a8b03f3ec83458a786a0"
      const mercerTenantId = "870cd702192b671e2c95c69d7f303d2d439150ecff50e67ebb672fabb652d85b"

      const response = await fetch(`http://mhserver.dev.127.0.0.1.nip.io/lantern-theme?tenantId=${moneyhubTenantId}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const {branding: {theme, appName}} = await response.json()

      setTheme(theme)
      setAppName(appName)
    }
 
    fetchData().catch((e) => {
      console.error('An error occurred while fetching the data: ', e)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Box background="white" padding={["m", "m", "l"]}>
        <ContentWrapper>
          <Stack space="xl">
            <Text as="h3" weight="l" size="l">Whats your name?</Text>
            <Formik initialValues={{name: ""}} onReset={() => setName("")} onSubmit={({name}) => {setName(name); setModalIsOpen(true)}}>
              <Form noValidate>
                <Stack space="l">
                  <Stack space="xl">
                    <TextInput label="Name" id="name" />
                  </Stack>
                  <Button varient="primary" type="submit">Submit</Button>
                  <Button varient="secondary" type="reset">Reset</Button>
                </Stack>
              </Form>
            </Formik>
            <Stack space="xl">
              <Text as="h3" weight="l" size="l">Greetings {name} from {appName}</Text>
            </Stack>
          </Stack>
          {/* <GreetingModal name={name} modalIsOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} /> */}
        </ContentWrapper>
      </Box>
    </ThemeProvider>
  )
}
