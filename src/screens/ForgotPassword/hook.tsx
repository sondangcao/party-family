export type ReceivedProps = {};

const useForgotPassword = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useForgotPassword>;

export default useForgotPassword;
