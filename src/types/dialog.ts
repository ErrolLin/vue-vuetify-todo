export type Dialog = {
  type: "ALERT" | "PROMPT";
  title: string;
  subTitle?: string;
  content: string;
  confirm: {
    text: string;
    event: (e?: any) => void;
  };
  cancel: string;
  data: {
    inputType?: "text" | "date";
    inputText: string;
    placeholder?: string;
  } | null;
};
