/*
<Section
  description={<Text> Description <Link source="/">here</Link></Text>}
  title={<Text bold align="center">Demo Settings</Text>}>
  <Text>
    This is a very basic demo settings page to show off some of the current
    capabilities of the Companion Settings library.
  </Text>
  <TextInput
    label="Example"
    title="Text Input"
    settingsKey="textInput"
    placeHolder="12345"
    disabled={!(props.settings.toggleTextInput === "true")}
  />
</Section>
*/

console.log("Opening Settings page");

function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Code Retrieval</Text>}>
        <AdditiveList
          addAction={
            <TextInput
              label="Click to Enter Code"
              title="Please Enter a 4-Digit Code"
              settingsKey="settings_code"
              placeHolder="1234"
              disabled={!(props.settings.toggleTextInput === "true")}
            />
          }
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);