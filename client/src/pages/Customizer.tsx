import { useSnapshot } from "valtio";
import state from "../store/index";
import { AnimatePresence, motion } from "framer-motion";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  DecalType,
  DecalTypes,
  EditorTabs,
  FilterTabs,
} from "../config/constants";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";
import { useState } from "react";
import { reader } from "../config/helpers";

type activeFilterTabType = {
  logoShirt: boolean;
  stylishShirt: boolean;
  [key: string]: boolean;
};

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<File | undefined>(undefined);

  const [prompt, setPrompt] = useState<string>("");
  const [generatingImg, setGeneratingImg] = useState<boolean>(false);

  const [activeEditorTab, setActiveEditorTab] = useState<string>("");
  const [activeFilterTab, setActiveFilterTab] = useState<activeFilterTabType>({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (type: string) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);
      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      if (data.photo) {
        handleDecals(type, `data:image/png;base64,${data.photo}`);
      } else {
        alert(
          "Sorry, generating images is not free anymore so I had to remove it :("
        );
      }
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const handleDecals = (type: string, result: string | boolean) => {
    const decalType: DecalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const readFile = (type: string) => {
    reader(file).then((result) => {
      const res = result as string | boolean;
      handleDecals(type, res);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {
                      if (tab.name === activeEditorTab) {
                        setActiveEditorTab("");
                      } else {
                        setActiveEditorTab(tab.name);
                      }
                    }}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
