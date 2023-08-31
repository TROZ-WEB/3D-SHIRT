import { Dispatch, SetStateAction } from "react";
import CustomButton from "./CustomButton";

type Props = {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
  generatingImg: boolean;
  handleSubmit: () => {};
};

const AIPicker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}: Props) => {
  return (
    <div className="aipicker-container">
      <textarea
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type="outline"
            title="AskingAI..."
            customStyles="text-xs"
            disabled
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit("logo")}
              customStyles="text-xs"
            />
            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit("logo")}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
