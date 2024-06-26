import React from 'react';

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Route,
  Router,
} from 'react-router';

import GlipChat
  from '@ringcentral-integration/glip-widgets/containers/GlipChat';
import GlipGroups
  from '@ringcentral-integration/glip-widgets/containers/GlipGroups';
import ActiveCallsPage
  from '@ringcentral-integration/widgets/containers/ActiveCallsPage';
import AlertContainer
  from '@ringcentral-integration/widgets/containers/AlertContainer';
import AudioSettingsPage
  from '@ringcentral-integration/widgets/containers/AudioSettingsPage';
// import CallCtrlPage from '@ringcentral-integration/widgets/containers/CallCtrlPage';
import CallBadgeContainer
  from '@ringcentral-integration/widgets/containers/CallBadgeContainer';
import CallingSettingsPage
  from '@ringcentral-integration/widgets/containers/CallingSettingsPage';
import {
  CallsOnholdPage,
} from '@ringcentral-integration/widgets/containers/CallsOnholdPage';
import ConferenceCallDialerPage
  from '@ringcentral-integration/widgets/containers/ConferenceCallDialerPage';
import {
  ConferenceParticipantPage,
} from '@ringcentral-integration/widgets/containers/ConferenceParticipantPage';
import {
  ConnectivityBadgeContainer,
} from '@ringcentral-integration/widgets/containers/ConnectivityBadgeContainer';
import ContactDetailsPage
  from '@ringcentral-integration/widgets/containers/ContactDetailsPage';
import ContactsPage
  from '@ringcentral-integration/widgets/containers/ContactsPage';
import ConversationsPage
  from '@ringcentral-integration/widgets/containers/ConversationsPage';
import {
  DialerAndCallsTabContainer,
} from '@ringcentral-integration/widgets/containers/DialerAndCallsTabContainer';
import DialerPage from '@ringcentral-integration/widgets/containers/DialerPage';
import {
  FeedbackPage,
} from '@ringcentral-integration/widgets/containers/FeedbackPage';
import FlipPage from '@ringcentral-integration/widgets/containers/FlipPage';
import GenericMeetingPage
  from '@ringcentral-integration/widgets/containers/GenericMeetingPage';
import {
  IncomingCallContainer,
} from '@ringcentral-integration/widgets/containers/IncomingCallContainer';
import {
  LoginPage,
} from '@ringcentral-integration/widgets/containers/LoginPage';
import {
  ModalContainer,
} from '@ringcentral-integration/widgets/containers/ModalContainer';
import RegionSettingsPage
  from '@ringcentral-integration/widgets/containers/RegionSettingsPage';
import {
  SimpleCallControlPage,
} from '@ringcentral-integration/widgets/containers/SimpleCallControlPage';
import {
  ThemeContainer,
} from '@ringcentral-integration/widgets/containers/ThemeContainer';
import TransferPage
  from '@ringcentral-integration/widgets/containers/TransferPage';
import {
  PhoneContext,
} from '@ringcentral-integration/widgets/lib/phoneContext';

import { getAlertRenderer } from '../../components/AlertRenderer';
import ThirdPartyContactSourceIcon
  from '../../components/ThirdPartyContactSourceIcon';
// import GenericMeetingPage from '../GenericMeetingPage';
import { formatMeetingInfo } from '../../lib/formatMeetingInfo';
import AppView from '../AppView';
import CallCtrlPage from '../CallCtrlPage';
import CallLogSectionModal from '../CallLogSectionModal';
import CallsListPage from '../CallsListPage';
import ComposeTextPage from '../ComposeTextPage';
import ConversationPage from '../ConversationPage';
import MainView from '../MainView';
import MeetingHistoryPage from '../MeetingHistoryPage';
import MeetingHomePage from '../MeetingHomePage';
import MeetingInviteModal from '../MeetingInviteModal';
import MeetingTabContainer from '../MeetingTabContainer';
import RecentActivityContainer from '../RecentActivityContainer';
import RingtoneSettingsPage from '../RingtoneSettingsPage';
import SettingsPage from '../SettingsPage';
import MeetingScheduleButton from '../ThirdPartyMeetingScheduleButton';

export default function App({
  phone,
  showCallBadge,
  appVersion,
}) {
  const getAvatarUrl = async (contact) => {
    const avatarUrl = await phone.contacts.getProfileImage(contact, true);
    return avatarUrl;
  };
  const ContactSourceIcon = ({ sourceType }) => {
    if (!phone.thirdPartyService.contactIcon) {
      return null;
    }
    if (sourceType !== phone.thirdPartyService.sourceName) {
      return null;
    }
    return (
      <ThirdPartyContactSourceIcon
        iconUri={phone.thirdPartyService.contactIcon}
        sourceName={phone.thirdPartyService.sourceName}
      />
    );
  };
  return (
    <PhoneContext.Provider value={phone}>
      <Provider store={phone.store} >
        <ThemeContainer>
          <Router history={phone.routerInteraction.history}>
            <Route
              component={routerProps => (
                <AppView>
                  {routerProps.children}
                  <CallBadgeContainer
                    hidden={(
                      (!showCallBadge) ||
                      routerProps.location.pathname && (
                        routerProps.location.pathname.indexOf('/calls/active') > -1 ||
                        routerProps.location.pathname.indexOf('/conferenceCall') > -1
                      )
                    )}
                    goToCallCtrl={(sessionId) => {
                      const session = phone.webphone.activeSession || phone.webphone.ringSession || {};
                      phone.routerInteraction.push(`/calls/active/${sessionId || session.id}`);
                    }}
                  />
                  <IncomingCallContainer
                    showContactDisplayPlaceholder={false}
                    getAvatarUrl={getAvatarUrl}
                    showCallQueueName
                  >
                    <AlertContainer
                      getAdditionalRenderer={getAlertRenderer}
                      callingSettingsUrl="/settings/calling"
                      regionSettingsUrl="/settings/region"
                    />
                  </IncomingCallContainer>
                  <ConnectivityBadgeContainer />
                  <MeetingInviteModal />
                  <ModalContainer />
                </AppView>
              )} >
              <Route
                path="/"
                component={() => (
                  <LoginPage showSignUp={phone.appFeatures.showSignUpButton}>
                    <AlertContainer
                      callingSettingsUrl="/settings/calling"
                      regionSettingsUrl="/settings/region"
                    />
                  </LoginPage>
                )}
              />
              <Route
                path="/"
                component={routerProps => (
                  <MainView>
                    {routerProps.children}
                    <AlertContainer
                      getAdditionalRenderer={getAlertRenderer}
                      callingSettingsUrl="/settings/calling"
                      regionSettingsUrl="/settings/region"
                    />
                  </MainView>
                )} >
                <Route
                  path="/dialer"
                  component={() => (
                    <DialerAndCallsTabContainer>
                      {
                        ({ showTabs }) => (
                          <DialerPage
                            withTabs={showTabs}
                          />
                        )
                      }
                    </DialerAndCallsTabContainer>
                  )}
                />
                <Route
                  path="/settings"
                  component={routerProps => (
                    <SettingsPage
                      params={routerProps.location.query}
                      showFeedback={false}
                      showUserGuide={false}
                      regionSettingsUrl="/settings/region"
                      callingSettingsUrl="/settings/calling"
                      appVersion={appVersion}
                    />
                  )}
                />
                <Route
                  path="/settings/region"
                  component={RegionSettingsPage}
                />
                <Route
                  path="/settings/calling"
                  component={CallingSettingsPage}
                />
                <Route
                  path="/settings/audio"
                  component={AudioSettingsPage}
                />
                <Route
                  path="/settings/ringtone"
                  component={RingtoneSettingsPage}
                />
                <Route
                  path="/settings/feedback"
                  component={FeedbackPage}
                />
                <Route
                  path="/history"
                  component={() => (
                    <div style={{ width: '100%', height: '100%' }}>
                      <CallsListPage />
                      <CallLogSectionModal />
                    </div>
                  )} />
                <Route
                  path="/calls"
                  component={() => (
                    <DialerAndCallsTabContainer>
                      <ActiveCallsPage
                        showRingoutCallControl={
                          phone.appFeatures.hasCallControl
                        }
                        showSwitchCall
                        onCallsEmpty={() => {
                          phone.routerInteraction.push('/dialer');
                        }}
                        useV2
                        getAvatarUrl={getAvatarUrl}
                      />
                    </DialerAndCallsTabContainer>
                  )} />
                <Route
                  path="/calls/active(/:sessionId)"
                  component={routerProps => (
                    <CallCtrlPage
                      params={routerProps.params}
                      onBackButtonClick={() => {
                        phone.routerInteraction.push('/calls');
                      }}
                      showPark
                      getAvatarUrl={getAvatarUrl}
                      showContactDisplayPlaceholder={false}
                      showCallQueueName
                    />
                  )} />
                <Route
                  path="/composeText"
                  component={() => <ComposeTextPage supportAttachment />}
                />
                <Route
                  path="/conversations/:conversationId"
                  component={routerProps => (
                    <ConversationPage
                      params={routerProps.params}
                      showContactDisplayPlaceholder={false}
                      showGroupNumberName
                      supportAttachment
                      onAttachmentDownload={(uri, e) => {
                        phone.thirdPartyService.onClickVCard(uri, e);
                      }}
                    />
                  )}
                />
                <Route
                  path="/messages"
                  component={() => (
                    <ConversationsPage
                      showGroupNumberName
                      showContactDisplayPlaceholder={false}
                    />
                  )}
                />
                <Route
                  path="/contacts"
                  component={() => (
                    <ContactsPage
                      onVisitPage={async () => { await phone.contacts.sync(); }}
                      onRefresh={async () => { await phone.contacts.sync({ type: 'manual' }); }}
                      sourceNodeRenderer={ContactSourceIcon}
                    />
                  )}
                />
                <Route
                  path="/contacts/:contactType/:contactId"
                  component={routerProps => (
                    <ContactDetailsPage
                      params={routerProps.params}
                      sourceNodeRenderer={ContactSourceIcon}
                      onClickMailTo={
                        (email) => {
                          window.open(`mailto:${email}`);
                        }
                      }
                    >
                      <RecentActivityContainer
                        navigateTo={(path) => {
                          phone.routerInteraction.push(path);
                        }}
                        contact={phone.contactDetailsUI.currentContact}
                        useContact
                      />
                    </ContactDetailsPage>
                  )}
                />
                <Route
                  path="/meeting/schedule"
                  component={() => {
                    const scheduleFunc = async (meetingInfo) => {
                      const resp = await phone.genericMeeting.schedule(meetingInfo);
                      if (!resp) {
                        return;
                      }
                      const formattedMeetingInfo = formatMeetingInfo(
                        resp, phone.brand, phone.locale.currentLocale, phone.genericMeeting.isRCV
                      );
                      phone.analytics.track('Meeting Scheduled');
                      if (phone.thirdPartyService.meetingInviteTitle) {
                        await phone.thirdPartyService.inviteMeeting(formattedMeetingInfo);
                        return;
                      }
                      phone.meetingInviteUI.showModal(formattedMeetingInfo);
                    };
                    if (phone.genericMeeting.isRCV) {
                      return (
                        <MeetingTabContainer>
                          <GenericMeetingPage
                            showHeader={false}
                            schedule={scheduleFunc}
                            scheduleButton={MeetingScheduleButton}
                            showRcvAdminLock
                          />
                        </MeetingTabContainer>
                      );
                    }
                    return (
                      <GenericMeetingPage
                        useRcmV2
                        schedule={scheduleFunc}
                        scheduleButton={MeetingScheduleButton}
                      />
                    );
                  }}
                />
                <Route
                  path="/meeting/home"
                  component={() => (
                    <MeetingTabContainer>
                      <MeetingHomePage />
                    </MeetingTabContainer>
                  )}
                />
                <Route
                  path="/meeting/history"
                  component={() => (
                    <MeetingTabContainer>
                      <MeetingHistoryPage
                        onLog={
                          phone.thirdPartyService.meetingLoggerRegistered ? (
                            (meeting) => phone.thirdPartyService.logMeeting(meeting)
                          ) : undefined
                        }
                        logTitle={phone.thirdPartyService.meetingLoggerTitle}
                      />
                    </MeetingTabContainer>
                  )}
                />
                <Route
                  path="/glip"
                  component={
                    () => (
                      <GlipGroups
                        hiddenCurrentGroup
                        onSelectGroup={(id) => {
                          phone.routerInteraction.push(`/glip/groups/${id}`);
                        }}
                      />
                    )
                  }
                />
                <Route
                  path="/glip/groups/:groupId"
                  component={
                    routerProps => (
                      <GlipChat
                        params={routerProps.params}
                        onBackClick={() => {
                          phone.routerInteraction.push('/glip');
                        }}
                        onViewPersonProfile={
                          async (personId) => {
                            if (personId === phone.glipPersons.me.id) {
                              return;
                            }
                            let group = phone.glipGroups.groups.slice(0, 10).find((g) => {
                              if (g.type !== 'PrivateChat') {
                                return false;
                              }
                              return g.members.indexOf(personId) > -1;
                            });
                            if (!group) {
                              group = await phone.glipGroups.startChat(personId);
                            }
                            if (group && group.id !== routerProps.params.groupId) {
                              phone.routerInteraction.push(`/glip/groups/${group.id}`);
                            }
                          }
                        }
                        onViewGroup={
                          (id) => {
                            if (id !== routerProps.params.groupId) {
                              phone.routerInteraction.push(`/glip/groups/${id}`);
                            }
                          }
                        }
                      />
                    )
                  }
                />
                <Route
                  path="/conferenceCall/dialer/:fromNumber/:fromSessionId"
                  component={ConferenceCallDialerPage}
                />
                <Route
                  path="/conferenceCall/participants"
                  component={() => (
                    <ConferenceParticipantPage />
                  )}
                />
                <Route
                  path="/conferenceCall/callsOnhold/:fromNumber/:fromSessionId"
                  component={routerProps => (
                    <CallsOnholdPage
                      params={routerProps.params}
                      onCreateContact={() => { }}
                      onCallsEmpty={() => { }}
                      getAvatarUrl={getAvatarUrl}
                    />
                  )}
                />
                <Route
                  path="/transfer/:sessionId(/:type)"
                  component={routerProps => (
                    <TransferPage
                      params={routerProps.params}
                      enableWarmTransfer={routerProps.params.type !== 'active'}
                    />
                  )}
                />
                <Route
                  path="/flip/:sessionId"
                  component={(routerProps) => (
                    <FlipPage params={routerProps.params} />
                  )}
                />
                <Route
                  path="/simplifycallctrl/:sessionId"
                  component={routerProps => (
                    <SimpleCallControlPage params={routerProps.params} />
                  )}
                />
              </Route>
            </Route>
          </Router>
        </ThemeContainer>
      </Provider>
    </PhoneContext.Provider>
  );
}

App.propTypes = {
  phone: PropTypes.object.isRequired,
  showCallBadge: PropTypes.bool.isRequired,
  appVersion: PropTypes.string,
};
