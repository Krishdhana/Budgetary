import React from "react"
import { Button, Dialog, Paragraph, Portal } from "react-native-paper"


export type Props = {
    open : boolean
    close : () => void,
    clearCache : () => void
}

const ResetCacheDialog : React.FC<Props> = ({open, close, clearCache }) => {
    return (<Portal>
        <Dialog visible={open} onDismiss={close}>
          <Dialog.Title>Clear Cache</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This is going to reset the App data!</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={close}>Cancel</Button>
            <Button onPress={clearCache}>Proceed</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>)
}

export default ResetCacheDialog