import InputComponent from "../Form/Input";
import { FaQuestionCircle } from "react-icons/fa";
import { useState } from "react";
import { Handle, Position } from "reactflow";
import { uuid } from "../../util";

const Welcome = () => {
  const [keyword, setKeyword] = useState("");
  const [regex, setRegex] = useState("");
  return (
    <div className="p-4">
      <InputComponent
        label="Keyword"
        description="This helps to define the content of an Object in the flow"
        placeholder="Enter Your Keyword"
        icon={<FaQuestionCircle className="text-gray-700 text-sm" />}
        onChange={(e) => setKeyword(e.target.value)}
        tooltip="This name will be visible to others."
        required={true}
        value={keyword}
      />
      <InputComponent
        label="Regex"
        description="This helps to define the content of an Object in the flow"
        placeholder="Enter Your Regex"
        icon={<FaQuestionCircle className="text-gray-700 text-sm" />}
        onChange={(e) => setRegex(e.target.value)}
        tooltip="This name will be visible to others."
        required={true}
        value={regex}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`handle-${uuid()}`}
        isConnectable={true}
        className="bg-white border-2 border-gray-900 w-3 h-3 rounded-full"
      />
    </div>
  );
};

export default Welcome;
