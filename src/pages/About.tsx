import { Button, TextField, Card, CardContent } from '@mui/material';
import { useState } from 'react';

interface ExampleProps {
  initialText?: string;
}

const ExampleComponent = ({ initialText = '' }: ExampleProps) => {
  const [text, setText] = useState(initialText);

  return (
    <Card>
      <CardContent>
        <TextField
          label="Type something"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert(text)}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExampleComponent;