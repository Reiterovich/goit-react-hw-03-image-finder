export const Button = ({ loadMore }) => {
  return (
    <>
      <button className="Button" onClick={() => loadMore()} type="button">
        Loader...
      </button>
    </>
  );
};
