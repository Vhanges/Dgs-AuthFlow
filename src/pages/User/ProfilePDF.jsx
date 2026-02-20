import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const domain_url = import.meta.env.VITE_API_BASE_URL_NO_VERSION;

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12 },

  header: {
    flexDirection: "row",
    marginBottom: 30,
    gap: 16,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    border: "2px solid black",
    borderRadius: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  headerInfo: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "column",
    gap: 2,
  },
  metaLabel: {
    fontSize: 9,
    color: "gray",
    textTransform: "uppercase",
  },
  metaValue: {
    fontSize: 11,
    paddingBottom: 3,
    minWidth: 100,
  },

  gallerySection: {
    marginTop: 10,
  },
  gridRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  gridItemWrapper: {
    flex: 1,
    height: 150,
    border: "2px solid black",
  },
  gridItem: {
    width: "100%",
    height: 150,
  },
  gridItemEmpty: {
    flex: 1,
    height: 150,
  },

  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "gray",
  },
});

const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const ProfilePDF = ({ profile, galleryImages }) => {
  const pages = chunkArray(galleryImages, 9);

  return (
    <Document>
      {pages.map((pageImages, pageIndex) => {
        const rows = chunkArray(pageImages, 3);

        return (
          <Page key={pageIndex} size="A4" style={styles.page}>
            {pageIndex === 0 && (
              <View style={styles.header}>
                <Image
                  style={styles.avatar}
                  src={domain_url + profile.avatar_url}
                />

                <View style={styles.headerInfo}>
                  <Text style={styles.username}>
                    {profile.display_name || "N/A"}
                  </Text>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>Email</Text>
                      <Text style={styles.metaValue}>
                        {profile.email || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>Age</Text>
                      <Text style={styles.metaValue}>
                        {profile.age || "N/A"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.gallerySection}>
              {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.gridRow}>
                  {row.map((item) => (
                    <View key={item.photo_id} style={styles.gridItemWrapper}>
                      <Image
                        style={styles.gridItem}
                        src={domain_url + item.url}
                      />
                    </View>
                  ))}
                  {row.length < 3 &&
                    Array(3 - row.length)
                      .fill(null)
                      .map((_, i) => (
                        <View key={`empty-${i}`} style={styles.gridItemEmpty} />
                      ))}
                </View>
              ))}
            </View>

            <Text style={styles.pageNumber}>
              PAGE {pageIndex + 1} of {pages.length}
            </Text>
          </Page>
        );
      })}
    </Document>
  );
};

export default ProfilePDF;
