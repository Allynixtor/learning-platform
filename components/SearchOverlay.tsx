// TODO: Refactor CSS styling using Stitches as per mockups

import * as Portal from '@radix-ui/react-portal'
import { useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Flex } from './Flex'
import { Box } from './Box'
import { styled } from 'stitches.config'
import { XCircle } from 'phosphor-react'

const StyledPortal = styled(Portal.Root, {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(16px)'
})

export default function SearchOverlay({
  changeActive = (state: boolean) => { }
}) {
  const [loaded, setLoaded] = useState(false)

  // Close overlay when 'Esc' pressed.
  useHotkeys('esc', () => changeActive(false), {
    enableOnTags: ['TEXTAREA', 'INPUT']
  })

  // TODO: Add click outside detection.
  // Requires refactoring SearchOverlay to only be its own component, and blur contents
  // of elements below (overlay div with backdrop blur applied?)

  // Inject Stork into document body
  useEffect(() => {
    if (!loaded) {
      const stork: HTMLScriptElement = document.createElement('script')
      stork.src = 'https://files.stork-search.net/releases/v1.4.2/stork.js'
      stork.addEventListener('load', () => setLoaded(true))
      document.body.appendChild(stork)
    } else {
      // TODO: Extend HTMLScriptElement with .register method on stork
      // params: data-stork: string, filename: string
      // @ts-ignore
      stork.register('search', '/stork-index.st') // eslint-disable-line no-undef
    }
  }, [loaded])

  return (
    <StyledPortal>
      <Box
        className="stork-wrapper"
        css={{
          width: '75%',
          paddingTop: '$9'
        }}>
        <Flex
          css={{
            width: 'max',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Flex
            css={{
              backgroundColor: '$blue3',
              fontSize: '$label-sm',
              color: '$blue12',
              padding: '$1 $3',
              marginBottom: '$2',
              width: 'fit-content',
              borderRadius: '$sm'
            }}>
            Search for content (Beta). Press Esc to close. Use Cmd + K to bring
            up search anytime.
          </Flex>
          <button aria-label="Close search" style={{ border: 0, backgroundColor: 'transparent', cursor: 'pointer' }}>
            <XCircle
              size={24}
              color="#889096"
              onClick={() => changeActive(false)}
            />
          </button>
        </Flex>

        <input
          data-stork="search"
          className="stork-input"
          id="stork-input"
          autoFocus
        />
        <div data-stork="search-output" className="stork-output"></div>
      </Box>
    </StyledPortal>
  )
}
