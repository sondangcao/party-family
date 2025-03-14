export type ReceivedProps = {};

const useChangePassword = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useChangePassword>;

export default useChangePassword;
