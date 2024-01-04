import style from '../../../style'
import { ImgBg } from '../../../style'
import PropTypes from 'prop-types'

const WindowBody = ({messageContainerRef, messages, currentUserToken}) => {
  return (
    <div
        className={`flex h-full w-full px-5 flex-col scroll-mb-0 overflow-y-auto`}
        // ref={messageContainerRef}
      >
        {Array.isArray(messages) && messages.length === 0 ? (
          <p className={`mx-auto mt-5 text-sm text-bLight_4/80`}>
            No messages yet.
          </p>
        ) : (
          messages.map((message) => (
            // Message item ----------------------
            <div
              key={message.id}
              className={`my-2 p-2 rounded-lg w-7/12 relative flex gap-2 align-baseline ${
                message.senderId === currentUserToken.id
                  ? "ml-auto text-right p-2 rounded-lg flex-row-reverse"
                  : "text-left p-2 rounded-lg"
              }`}
            >
              <div className={`flex flex-col items-center`}>
                {/* Image -------------------*/}
                <div
                  style={ImgBg({ img: message.avatar })}
                  className={`w-8 h-8 rounded-full`}
                ></div>
                {/* username ----------------- */}
                <span className="text-bLight_4 text-xs">
                  @{message.username}
                </span>
              </div>

              {/* content ------------------ */}
              <p
                className={`w-max max-w-full text-bLight_2 p-3 whitespace-normal break-words  text-sm rounded-2xl ${
                  message.senderId === currentUserToken.id
                    ? "bg-bLight_5/40"
                    : "bg-org_1/20"
                }`}
              >
                {message.Content}
              </p>
            </div>
          ))
        )}
      </div>
  )
}

WindowBody.propTypes = {
  messageContainerRef: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  currentUserToken: PropTypes.object.isRequired,
}

export default WindowBody