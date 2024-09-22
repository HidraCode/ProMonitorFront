import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BackButton = ({ path }) => {

  const navigate = useNavigate()

  return(
    <div className="top-0 left-0 w-full py-4">
        <div className="flex items-center justify-start max-w-4xl mx-auto">
          <Button
            type="link"
            onClick={() => navigate(path)}
            className="flex items-center px-4 py-2 rounded-lg text-gray-800"
          >
            <ArrowLeftOutlined />
            <span className="ml-2 text-sm sm:text-base">Voltar</span>
          </Button>
        </div>
      </div>
  )
}
export default BackButton;