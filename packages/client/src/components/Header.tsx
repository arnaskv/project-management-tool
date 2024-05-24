import styled from '@emotion/styled';

const Box = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100vw',
  height: '50px',
});

export default function Header() {
  return (
    <Box>
      <div>name</div>
      <div>settings</div>
    </Box>
  );
}
