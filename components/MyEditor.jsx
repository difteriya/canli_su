import { useRef, useState } from "react";
import { Editor, EditorState, RichUtils, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { Listbox, Menu } from "@headlessui/react";

export default function MyEditor({ editorState, onChange }) {
  // const [editorState, setEditorState] = React.useState(() =>
  //   EditorState.createWithContent(emptyContentState)
  // );

  const onEditorChange = (se) => {
    // setEditorState(se);
    onChange(se);
  };

  const editor = useRef(null);

  const focus = () => {
    if (editor.current) editor.current.focus();
  };

  const toggleBlockType = (blockType) => {
    onEditorChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  let className = "RichEditor-editor";
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div className="border rounded">
      <div className="border-b divide-x flex gap-1">
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </div>
      <div
        className={`p-3 prose  max-w-full min-h-[150px] ${className}`}
        onClick={focus}
      >
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={onEditorChange}
          placeholder="Nəsə yaz"
        />
      </div>
    </div>
  );
}

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "foo",
      type: "unstyled",
      entityRanges: []
    }
  ]
});

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const StyleButton = (props) => {
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  const Icon = props.label;

  return (
    <div
      className={` rounded-lg cursor-pointer w-8 h-8 inline-flex  active:bg-th-600/10  items-center justify-center outline-none select-none ${
        props.active ? "text-th-600" : "text-gray-600 hover:text-th-600"
      } `}
      onMouseDown={onToggle}
    >
      <Icon className="w-5 h-5 " />
    </div>
  );
};

const ListIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
    />
  </svg>
);

const OrderedListIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
    />
  </svg>
);

const HeadingIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path fill="currentColor" d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z" />
  </svg>
);

const CaretIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path fill="currentColor" d="M12 14l-4-4h8z" />
  </svg>
);

const BLOCK_TYPES = [
  // { label: "Blockquote", style: "blockquote" },
  { label: ListIcon, style: "unordered-list-item" },
  { label: OrderedListIcon, style: "ordered-list-item" }
  // { label: "Code Block", style: "code-block" }
];

const BLOCK_HEADING = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" }
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  // const onHeadingChange = (s) => {
  //   props.onToggle(s);
  // };

  return (
    <div className="flex divide-x gap-1">
      <div className="p-1">
        {/* {BLOCK_HEADING.map((type) => (
          <StyleDropDown
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))} */}
        <Menu>
          <div className="relative">
            <Menu.Button
              className={`rounded text-sm pl-1 h-8 inline-flex text-gray-500 hover:text-gray-600 active:bg-gray-100  items-center justify-center outline-none select-none `}
            >
              <HeadingIcon className="w-5 h-5" />
              <CaretIcon className="h-5 -ml-0.5 opacity-75" />
            </Menu.Button>
            <Menu.Items className="absolute left-0 -translate-y-1/3 w-12 z-10 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {BLOCK_HEADING.map((type) => (
                <Menu.Item
                  key={type.label}
                  onMouseDown={() => {
                    props.onToggle(type.style);
                  }}
                >
                  {({ active }) => (
                    <button
                      className={`${
                        type.style === blockType
                          ? "bg-th-600/10 text-th-600 "
                          : "text-gray-900"
                      } group hover:text-th-600 flex w-full items-center justify-center  px-2 py-2 text-sm`}
                    >
                      {type.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </div>
        </Menu>
      </div>
      <div className="p-1">
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    </div>
  );
};

const BoldIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"
    />
  </svg>
);
const ItalicIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"
    />
  </svg>
);
const UnderlineIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"
    />
  </svg>
);

const INLINE_STYLES = [
  { label: BoldIcon, style: "BOLD" },
  { label: ItalicIcon, style: "ITALIC" },
  { label: UnderlineIcon, style: "UNDERLINE" }
  // { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="p-1">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
