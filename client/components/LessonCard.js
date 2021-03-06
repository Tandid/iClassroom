import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {storage} from '../firebase'
import {removeLesson, updateLesson} from '../store'
import {
  IconButton,
  makeStyles,
  Typography,
  ThemeProvider,
  Grid,
  Tooltip,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core'
import theme from './Theme'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    minWidth: theme.spacing(12)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  }
})

const LessonCard = ({
  title,
  description,
  id,
  documents,
  remove,
  user,
  update
}) => {
  const [expanded, setExpanded] = useState(false)
  const [docs, setDocs] = useState(documents.length ? documents : [])
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleUpload = e => {
    console.log(e.target.files)
    const links = []
    if (e.target.files) {
      const attachments = e.target.files
      Object.values(attachments).map(attachment => {
        const attachmentInfo = {}
        attachmentInfo.name = attachment.name
        const uploadTask = storage
          .ref(`lessons/${attachment.name}`)
          .put(attachment)
        return uploadTask.on(
          'state_changed',
          snapshot => {
            const progressBar = Math.round(
              snapshot.bytesTransferred / snapshot.totalBytes * 100
            )
            setProgress(progressBar)
          },
          error => {
            console.log(error)
          },
          () => {
            storage
              .ref('lessons')
              .child(attachment.name)
              .getDownloadURL()
              .then(URL => {
                console.log(URL)
                attachmentInfo.link = URL
                links.push(attachmentInfo)
              })
          }
        )
      })
      console.log({links: links})
      setDocs(links)

      console.log('docs', docs)
    }
  }

  const onSubmit = ev => {
    ev.preventDefault()
    try {
      update(
        {
          documents: docs
        },
        id,
        history.push
      )
    } catch (exception) {
      setError({error: exception.response.data.message})
    }
    setProgress(0)
  }

  useEffect(
    () => {
      console.log('useEffect', docs)
    },
    [docs]
  )

  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container direction="row" justify="space-between">
          <Grid item xs={12}>
            <ExpansionPanel
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  className={classes.heading}
                  color="primary"
                  variant="h6"
                >
                  {title}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>{description}</Typography>
              </ExpansionPanelDetails>

              {docs.length > 0 &&
                docs.map(doc => (
                  <ExpansionPanelDetails key={doc.id}>
                    <a
                      className="link"
                      href={doc.link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {doc.name}
                    </a>
                  </ExpansionPanelDetails>
                ))}

              {user.isTeacher && (
                <ExpansionPanelDetails>
                  <div id="row">
                    <div className="row">
                      <input
                        id="icon-button-lessons"
                        multiple
                        type="file"
                        onChange={handleUpload}
                      />

                      {progress === 100 ? (
                        <button
                          type="submit"
                          disabled={documents === docs}
                          onClick={onSubmit}
                        >
                          Replace Files
                        </button>
                      ) : (
                        <progress value={progress} max="100" />
                      )}
                    </div>

                    <Tooltip title="Delete Lesson">
                      <IconButton>
                        <DeleteIcon onClick={() => remove(id)} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </ExpansionPanelDetails>
              )}
            </ExpansionPanel>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = ({user}) => {
  return {user}
}
const mapDispatchToProps = dispatch => {
  return {
    remove: id => dispatch(removeLesson(id)),
    update: (lesson, id, push) => dispatch(updateLesson(lesson, id, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonCard)
