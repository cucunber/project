import { colors } from "@/constants";
import { useEvent } from "@/hooks";
import {
  Input,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useState,
} from "react";

const regex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export function Mailer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidMessage, setIsValidMessage] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const toast = useToast();

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = useEvent(
    (event) => {
      setIsValidEmail(regex.test(email));
    }
  );

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = useEvent(
    (event) => {
      const { value } = event.currentTarget;
      setEmail(value);
    }
  );

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = useEvent(
    (event) => {
      const { value } = event.currentTarget;
      setIsValidMessage(!!value.length);
      setMessage(value);
    }
  );

  const handleSandMessage: MouseEventHandler<HTMLButtonElement> = useEvent(
    (event) => {
      setIsSending(true);
      event.preventDefault();
    }
  );

  const canSend = isValidEmail && isValidMessage;

  return (
    <VStack
      spacing={2}
      sx={{
        width: "100%",
        background: colors.background,
        padding: 4,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text
        sx={{
          fontSize: "36px",
          lineHeight: "1",
          fontWeight: 500,
          color: colors.color,
          marginBottom: 6,
        }}
      >
        Остались вопросы?
      </Text>
      <Text sx={{ color: colors.color }}>
        Напишите нам на почту и мы ответим на все Ваши вопросы
      </Text>
      <FormControl
        sx={{
          width: "80%",
          marginTop: 8,
        }}
      >
        <FormLabel
          sx={{
            color: colors.color,
          }}
        >
          Email
        </FormLabel>
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleInputBlur}
          size="md"
          sx={{
            color: colors.color,
          }}
        />
      </FormControl>
      <FormControl
        sx={{
          width: "80%",
        }}
      >
        <FormLabel
          sx={{
            color: colors.color,
          }}
        >
          Ваш вопрос
        </FormLabel>
        <Textarea
          sx={{
            color: colors.color,
          }}
          value={message}
          onChange={handleMessageChange}
        />
      </FormControl>
      <Button
        disabled={!canSend}
        isLoading={isSending}
        onClick={handleSandMessage}
      >
        Отправить
      </Button>
    </VStack>
  );
}
