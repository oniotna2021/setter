export const Star = ({ color = "black", width = "21", height = "21" }) => {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.59749 0.891366C5.95972 0.132244 7.04028 0.132245 7.40252 0.891367L8.42637 3.03703C8.57215 3.34254 8.8626 3.55355 9.1982 3.59779L11.5552 3.90849C12.3891 4.01842 12.7231 5.04609 12.113 5.62518L10.3888 7.26197C10.1433 7.49503 10.0323 7.83646 10.094 8.16931L10.5268 10.507C10.68 11.3341 9.80578 11.9692 9.06652 11.568L6.97701 10.4339C6.6795 10.2724 6.3205 10.2724 6.02298 10.4339L3.93348 11.568C3.19422 11.9692 2.32003 11.3341 2.47318 10.507L2.90605 8.16931C2.96768 7.83646 2.85674 7.49503 2.61124 7.26197L0.886979 5.62518C0.276948 5.04609 0.610861 4.01842 1.44477 3.90849L3.8018 3.59779C4.13741 3.55355 4.42785 3.34254 4.57363 3.03703L5.59749 0.891366Z"
        fill={color}
      />
    </svg>
  );
};

export const Calendar = ({ color = "black", width = "25", height = "25" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.3455 3.091C1.09154 3.091 0.891 3.29154 0.891 3.5455V17.5455C0.891 17.7995 1.09154 18 1.3455 18H17.8455C18.0995 18 18.3 17.7995 18.3 17.5455V3.5455C18.3 3.29154 18.0995 3.091 17.8455 3.091H1.3455ZM0 3.5455C0 2.79946 0.599457 2.2 1.3455 2.2H17.8455C18.5915 2.2 19.191 2.79946 19.191 3.5455V17.5455C19.191 18.2915 18.5915 18.891 17.8455 18.891H1.3455C0.599457 18.891 0 18.2915 0 17.5455V3.5455Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.5455 0C4.79154 0 4.991 0.199457 4.991 0.4455V4.2455C4.991 4.49154 4.79154 4.691 4.5455 4.691C4.29946 4.691 4.1 4.49154 4.1 4.2455V0.4455C4.1 0.199457 4.29946 0 4.5455 0Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.4455 0C14.6915 0 14.891 0.199457 14.891 0.4455V4.2455C14.891 4.49154 14.6915 4.691 14.4455 4.691C14.1995 4.691 14 4.49154 14 4.2455V0.4455C14 0.199457 14.1995 0 14.4455 0Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.9 9.1455C2.9 8.89946 3.09946 8.7 3.3455 8.7H5.7455C5.99154 8.7 6.191 8.89946 6.191 9.1455C6.191 9.39154 5.99154 9.591 5.7455 9.591H3.3455C3.09946 9.591 2.9 9.39154 2.9 9.1455Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 9.1455C8 8.89946 8.19946 8.7 8.4455 8.7H10.7455C10.9915 8.7 11.191 8.89946 11.191 9.1455C11.191 9.39154 10.9915 9.591 10.7455 9.591H8.4455C8.19946 9.591 8 9.39154 8 9.1455Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 9.1455C13 8.89946 13.1995 8.7 13.4455 8.7H15.7455C15.9915 8.7 16.191 8.89946 16.191 9.1455C16.191 9.39154 15.9915 9.591 15.7455 9.591H13.4455C13.1995 9.591 13 9.39154 13 9.1455Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.9 12.8455C2.9 12.5995 3.09946 12.4 3.3455 12.4H5.7455C5.99154 12.4 6.191 12.5995 6.191 12.8455C6.191 13.0915 5.99154 13.291 5.7455 13.291H3.3455C3.09946 13.291 2.9 13.0915 2.9 12.8455Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 12.8455C8 12.5995 8.19946 12.4 8.4455 12.4H10.7455C10.9915 12.4 11.191 12.5995 11.191 12.8455C11.191 13.0915 10.9915 13.291 10.7455 13.291H8.4455C8.19946 13.291 8 13.0915 8 12.8455Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 12.8455C13 12.5995 13.1995 12.4 13.4455 12.4H15.7455C15.9915 12.4 16.191 12.5995 16.191 12.8455C16.191 13.0915 15.9915 13.291 15.7455 13.291H13.4455C13.1995 13.291 13 13.0915 13 12.8455Z"
        fill={color}
      />
    </svg>
  );
};
