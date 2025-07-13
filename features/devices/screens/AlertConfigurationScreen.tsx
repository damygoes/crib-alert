import { AVAILABLE_SOUNDS } from '@/constants/sounds';
import { useDebounce } from '@/hooks/useDebounce';
import { DeviceEvent } from '@/types/DeviceEvent';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useUserEventSettings } from '../hooks/useUserEventSettings';

export default function AlertConfigurationScreen() {
  const { eventSettings, updateSetting, isUpdating } = useUserEventSettings();
  const [openDropdown, setOpenDropdown] = useState<DeviceEvent | null>(null);

  const [dropdownStates, setDropdownStates] = useState<
    Record<DeviceEvent, string>
  >({} as Record<DeviceEvent, string>);

  const debouncedUpdateSetting = useDebounce(
    (eventType: DeviceEvent, soundName: string) => {
      updateSetting({ event_type: eventType, sound_name: soundName });
    },
    500
  );

  const handleChange = (eventType: DeviceEvent, value: string) => {
    setDropdownStates((prev) => ({ ...prev, [eventType]: value }));
    debouncedUpdateSetting(eventType, value);
  };

  useEffect(() => {
    if (eventSettings) {
      const updatedStates: Partial<Record<DeviceEvent, string>> = {};
      Object.values(DeviceEvent).forEach((eventType) => {
        const sound =
          eventSettings.find((s) => s.event_type === eventType)?.sound_name ||
          '';
        updatedStates[eventType] = sound;
      });
      setDropdownStates((prev) => ({ ...prev, ...updatedStates }));
    }
  }, [eventSettings]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alert Configuration</Text>

      {Object.values(DeviceEvent).map((eventType, index) => {
        const isOpen = openDropdown === eventType;
        return (
          <View
            key={eventType}
            style={[styles.row, { zIndex: 1000 - index, position: 'relative' }]}
          >
            <Text style={styles.label}>
              {eventType
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </Text>

            <View style={styles.dropdownWrapper}>
              <DropDownPicker
                open={isOpen}
                value={dropdownStates[eventType]}
                items={AVAILABLE_SOUNDS.map((sound) => ({
                  label: sound.label,
                  value: sound.value,
                }))}
                setOpen={(value) => {
                  const next =
                    typeof value === 'function' ? value(isOpen) : value;
                  setOpenDropdown(next ? eventType : null);
                }}
                setValue={(setValueFn) => {
                  const newValue = setValueFn(dropdownStates[eventType]);
                  handleChange(eventType, newValue);
                }}
                disabled={isUpdating}
                listMode="FLATLIST"
                style={styles.dropdown}
                containerStyle={[
                  styles.dropdownContainer,
                  isOpen && {
                    zIndex: 2000,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  },
                ]}
                dropDownContainerStyle={styles.dropdownBox}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    flex: 1,
    marginRight: 16,
  },
  dropdownWrapper: {
    width: 180,
    height: 44,
    justifyContent: 'center',
  },
  dropdownContainer: {
    width: 180,
    height: 44,
  },
  dropdownBox: {
    backgroundColor: '#fff',
    maxHeight: 300,
    borderColor: '#ccc',
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: '#f1f1f1',
    borderColor: '#ccc',
  },
});
